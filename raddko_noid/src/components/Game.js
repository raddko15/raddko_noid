import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           board: {
               width:480,
               height:320
           },
           ball: {
               radius:10,
               positionX:240,
               positionY:150,
               speedX:2,
               speedY:-2,
           },
           paddle: {
               width:75,
               height:10,
               positionX: 240,
               positionY: 280
           },
           brick: {
              width:75,
              height:20,
              padding:10,
              offsetTop:30,
              offsetLeft:30,
              status: 'display'
           },
           bricksStructure: {
               arrayOfBricks: [],
               rowAmount:3,
               columnAmount:5
           },
           keys: {
               right: {
                   code: 39,
                   isPressed:false
               },
               left: {
                   code: 37,
                   isPressed:false
               }
           }
        }
    //this.wypiszTest = this.wypiszTest.bind(this);
    }
    _handleKeyDown(e)  {
        let { left,right } = this.state.keys;


        switch( e.keyCode ) {
            case left.code:
                // this.setState({ball:{
                //     ...ball,
                //     speedY: - ball.speedY
                // }});
                // this.setState({keys:{left:{
                //     ...left,
                //     code:true
                // }}});
                //this.setState({...this.state, keys:{...this.state.keys, isPressed: true}});
                this.setState({...this.state, keys:{...this.state.keys, left:{...this.state.keys.left, isPressed:true}}});
               // this.setState({keys:{ left:{ isPressed:true}}});
                console.log("left");
                break;
            case right.code:
                this.setState({...this.state, keys:{...this.state.keys, right:{...this.state.keys.right, isPressed:true}}});
                console.log("right");
                break;
            default:
                break;
        }

    }
    _handleKeyUp(e) {
        let { left,right } = this.state.keys;

        switch( e.keyCode ) {
            case left.code:
                this.setState({...this.state, keys:{...this.state.keys, left:{...this.state.keys.left, isPressed:false}}});
                break;
            case right.code:
                this.setState({...this.state, keys:{...this.state.keys, right:{...this.state.keys.right, isPressed:false}}});
                break;
            default:
                break;
        }
    }
    createInitialBricksStructure(){
        let { brick, bricksStructure } = this.state;

        for(let i=0; i<bricksStructure.rowAmount; i++) {
            bricksStructure.arrayOfBricks[i] = [];
            for(let j=0; j<bricksStructure.columnAmount; j++){
                bricksStructure.arrayOfBricks[i][j] = brick;
            }
        }
        console.log(bricksStructure.arrayOfBricks)

    }
    componentDidMount() {
        let canvas = ReactDOM.findDOMNode(this.refs.canvas);
        let ctx = canvas.getContext('2d');
        this.createInitialBricksStructure();
        var self = this;
        setInterval(function() {
            self.draw(ctx);
        },10);
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
        document.addEventListener("keyup", this._handleKeyUp.bind(this));
      //  this.draw(ctx);
     //   setInterval(this.draw, 1000);
    }
     componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown.bind(this));
        document.addEventListener("keydown", this._handleKeyUp.bind(this));
     }
    bouncing() {
        let {ball, board, paddle} = this.state;

        if(ball.positionY + ball.speedY < ball.radius) {
            //this.setState((prevState) => ({ ball_speedY: -prevState.ball_speedY}));
            this.setState({ball:{
                ...ball,
                speedY: - ball.speedY
            }});
        }
        else if(ball.positionY + ball.speedY > board.height - ball.radius) {
            //this.setState((prevState) => ({ ball_speedY: -prevState.ball_speedY}));
            // this.setState({ball:{
            //     ...ball,
            //     speedY: - ball.speedY
            // }});
            // if(ball.positionX > paddle.positionX && ball.positionX < paddle.positionX + paddle.width) {
            //     this.setState({ball:{
            //         ...ball,
            //         speedY: - ball.speedY
            //     }});
            //     console.log("pah");
            // }
            // else {
            //     console.log("koniec");
            // }
        }
        if(ball.positionX + ball.speedX > board.width - ball.radius) {
            //this.setState((prevState) => ({ ball_speedX: -prevState.ball_speedX}));
            this.setState({ball:{
                ...ball,
                speedX: - ball.speedX
            }});
        }
        if(ball.positionX + ball.speedX < ball.radius) {
            this.setState({ball:{
                ...ball,
                speedX: - ball.speedX
            }});
        }
        if(ball.positionY + ball.speedY > board.height - ball.radius) {
            this.setState({ball:{
                ...ball,
                speedY: - ball.speedY
            }});

        }
        if(ball.positionX + paddle.width/2 > paddle.positionX && ball.positionX < paddle.positionX + paddle.width/2 && ball.positionY === paddle.positionY-ball.radius  ) {
                this.setState({ball:{
                    ...ball,
                    speedY: - ball.speedY
                }});
                console.log("pah");
            }
    }


    setSpeed(){
        let { ball } = this.state;
        this.setState({
            ball:{
                ...ball,
                positionX: ball.positionX + ball.speedX,
                positionY: ball.positionY + ball.speedY
            },
        });
    }
    movePaddle() {
        let { paddle, keys, board } = this.state;
        if(keys.right.isPressed && paddle.positionX < board.width - paddle.width/2 ) {
            this.setState({paddle:{
                ...paddle,
               positionX: paddle.positionX + 7
            }});
        }
        else if(keys.left.isPressed && paddle.positionX > paddle.width/2) {
            this.setState({paddle:{
                ...paddle,
                positionX:  paddle.positionX - 7
            }});
        }
    }
    drawPaddle(ctx) {
        let { paddle } = this.state;
        ctx.beginPath();
        ctx.rect(paddle.positionX - paddle.width/2, paddle.positionY, paddle.width, paddle.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    drawBricks(ctx) {

    }
    drawBall(ctx) {
        let { ball } = this.state;
        ctx.beginPath();
        ctx.arc(ball.positionX, ball.positionY, ball.radius,0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    draw(ctx) {
       // const ctx = this.refs.canvas.getContext('2d');
        let { board } = this.state;
        ctx.clearRect(0,0, board.width, board.height);
        this.drawPaddle(ctx);
        this.drawBall(ctx);
        this.setSpeed();
        this.bouncing();
        this.movePaddle();
        //console.log(this.state.keys.right.isPressed)


    }

    render() {
        return (<canvas ref="canvas" id="myCanvas"
        width={this.state.board.width}
        height={this.state.board.height} />);
    }


}

export default Game;