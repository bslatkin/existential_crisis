/** @jsx React.DOM */
// Copyright 2014 Brett Slatkin

var Turn = {
    X: 'X',
    O: 'O'
};


var Square = React.createClass({
    handleClick: function(e) {
        this.props.changeSquare(this.props.row, this.props.col);
    },
    render: function() {
        return (
            <div className={"square row" + this.props.row + " col" +
                            this.props.col} onClick={this.handleClick}>
                <span className={'turn-' + this.props.turn}>
                    {this.props.turn}
                </span>
            </div>
        );
    }
});


var WhoseTurn = React.createClass({
    render: function() {
        var turn = this.props.winner || this.props.turn;
        var message = (
            <span>
                <span className={'turn-' + turn}>
                    {turn}
                </span>
                {' '}should go
            </span>
        );
        if (this.props.winner) {
            message = (
                <span>
                    <span className={'turn-' + turn}>
                        {turn}
                    </span>
                    {' '}has won
                </span>
            );
        } else if (this.props.plays == 9) {
            message = <span>Draw!</span>
        }
        return (
            <div className={'whose-turn ' + status}>
                {message}
            </div>
        );
    }
});


var Board = React.createClass({
    getInitialState: function() {
        return {
            board: [[null, null, null],
                    [null, null, null],
                    [null, null, null]],
            plays: 0,
            turn: Turn.X,
            winner: null
        };
    },
    checkSquares: function(x, y, z) {
        if (x === y && y === z && !!x) {
            return x;
        }
    },
    checkWinner: function() {
        var board = this.state.board;
        // Row wins
        for (var i = 0; i < board.length; i++) {
            var winner = this.checkSquares(
                board[i][0], board[i][1], board[i][2]);
            if (!!winner) {
                return winner;
            }
        }

        // Column wins
        for (var i = 0; i < board.length; i++) {
            var winner = this.checkSquares(
                board[0][i], board[1][i], board[2][i]);
            if (!!winner) {
                return winner;
            }
        }

        // NW to SE diagnol
        var winner = this.checkSquares(
            board[0][0], board[1][1], board[2][2]);
        if (!!winner) {
            return winner;
        }

        // SW to NE diagnol
        var winner = this.checkSquares(
            board[2][0], board[1][1], board[0][2]);
        if (!!winner) {
            return winner;
        }
    },
    changeSquare: function(row, col) {
        if (!this.state.winner &&
            this.state.board[row][col] === null) {
            this.state.board[row][col] = this.state.turn;
            this.state.plays += 1;
        }
        this.setState({
            board: this.state.board,
            plays: this.state.plays,
            turn: this.state.turn == Turn.X ? Turn.O : Turn.X,
            winner: this.checkWinner()
        });
    },
    render: function() {
        var squares = [];
        for (var i = 0; i < this.state.board.length; i++) {
            var row = this.state.board[i];
            for (var j = 0; j < row.length; j++) {
                var square =
                    <Square
                        row={i}
                        col={j}
                        turn={row[j]}
                        changeSquare={this.changeSquare} />;
                squares.push(square);
            }
        }
        return (
            <div class="everything">
                <WhoseTurn
                    plays={this.state.plays}
                    turn={this.state.turn}
                    winner={this.state.winner} />
                <div className="board">
                    {squares}
                </div>
            </div>
        );
    }
});


React.initializeTouchEvents(true);


React.renderComponent(
    <Board />,
    document.getElementById('content'));
