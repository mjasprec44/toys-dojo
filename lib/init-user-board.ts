import dbConnect from "./dbConnect";
import Board from "./models/board";
import Column from "./models/column";

const DEFAULT_COLUMNS = [
  {
    name: "To List",
    order: 0,
  },
  {
    name: "Listed",
    order: 1,
  },
  {
    name: "On Hold",
    order: 2,
  },
  {
    name: "Sold",
    order: 3,
  },
  {
    name: "Cancelled",
    order: 4,
  },
];

export async function initializeUserBoard(userId: string) {
  try {
    await dbConnect();

    // Check if board exists
    const existingBoard = await Board.findOne({
      userId,
      name: "Listing Board",
    });

    // Return existing board
    if (existingBoard) {
      return existingBoard;
    }

    // Create board
    const board = await Board.create({
      name: "Listing Board",
      userId,
      columns: [],
    });

    // Create default columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          products: [],
        }),
      ),
    );

    // Update board with the new column ids
    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (err) {
    throw err;
  }
}
