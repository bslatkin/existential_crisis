



def run():
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]

  color = 'X'

  print 'To play, type the coordinates of where you want to go.'
  print 'For example, the middle square is 22, the top right is'
  print '31, and the bottom left is 13.'

  while True:
    print
    print '    1   2   3'
    print '  +---+---+---+'
    for i, row in enumerate(board):
      row = tuple([i+1] + row)
      print '%d | %s | %s | %s |' % row
      print '  +---+---+---+'

    # Figure out where the move is
    command = raw_input("%s's turn (type xy): " % color)
    if not len(command) == 2:
      print 'Bad command'
      continue

    try:
      column = int(command[0])
      row = int(command[1])
    except ValueError:
      print 'Command not numbers'
      continue

    if not (3 >= column >= 1):
      print 'Bad column'
      continue

    if not (3 >= row >= 1):
      print 'Bad row'
      continue

    column -= 1
    row -= 1
    if board[row][column] != ' ':
      print 'Illegal move'
      continue

    # Apply the move and swap the player
    board[row][column] = color
    if color == 'X':
      color = 'O'
    else:
      color = 'X'

    # Check for a winner
    # Horziontal
    for row in board:
      if row[0] != ' ' and (row[0] == row[1] == row[2]):
        print '%s wins!' % row[0]
        return

    # Vertical
    for i in xrange(3):
      if board[0][i] != ' ' and (board[0][i] == board[1][i] == board[2][i]):
        print '%s wins!' % board[0][i]
        return

    # Diagnol
    if board[0][0] != ' ' and (board[0][0] == board[1][1] == board[2][2]):
      print '%s wins!' % board[0][0]
      return

    if board[0][2] != ' ' and (board[0][2] == board[1][1] == board[2][0]):
      print '%s wins!' % board[0][2]
      return


run()
