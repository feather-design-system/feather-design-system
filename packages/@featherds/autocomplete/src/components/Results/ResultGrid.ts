import { reactive, nextTick } from "vue";
import { KEYCODES } from "@featherds/utils/keys";
import {
  IAutocompleteItemType,
  IAutocompleteGridColumn,
  IAutocompleteResultRender,
} from "../types";
const useResultGrid = (config: IAutocompleteGridColumn[]) => {
  const active = reactive({
    row: -1,
    col: -1,
  });

  const moveRowCol = (row: number, col: number) => {
    nextTick(() => {
      active.col = col;
      active.row = row;
    });
  };
  const handleKeyPress = (
    e: KeyboardEvent,
    internalResults: IAutocompleteItemType[]
  ) => {
    //menu navigation
    if (e.keyCode === KEYCODES.DOWN) {
      //down
      e.preventDefault();
      if (active.row === -1) {
        reset();
        moveRowCol(0, 0);
      } else if (active.row + 1 <= internalResults.length - 1) {
        const oldIndex = active.row;
        const oldCol = active.col;
        reset();
        moveRowCol(oldIndex + 1, oldCol);
      }
      return true;
    }
    if (e.keyCode === KEYCODES.UP) {
      //up
      e.preventDefault();
      if (active.row === 0) {
        reset();
      } else if (active.row > 0) {
        const oldIndex = active.row;
        const oldCol = active.col;
        reset();
        moveRowCol(oldIndex - 1, oldCol);
      }
      return true;
    }
    if (e.keyCode === KEYCODES.RIGHT && active.row !== -1) {
      //right
      e.preventDefault();
      if (active.col + 1 <= config.length - 1) {
        //move along row
        const oldIndex = active.col;
        const oldRow = active.row;
        reset();
        moveRowCol(oldRow, oldIndex + 1);
      } else if (
        active.col <= config.length - 1 &&
        active.row + 1 <= internalResults.length - 1
      ) {
        //move on to next line does not go past bottom right
        const oldIndex = active.row;
        reset();
        moveRowCol(oldIndex + 1, 0);
      }
      return true;
    }
    if (e.keyCode === KEYCODES.LEFT && active.row !== -1) {
      //left
      e.preventDefault();
      if (active.col === 0 && active.row === 0) {
        //top left do nothing
        return true; //skip do nothing //might need to move to bototm right
      } else if (active.col === 0 && active.row > 0) {
        //left most cell but can have row above
        const oldIndex = active.row;
        reset();
        moveRowCol(oldIndex - 1, config.length - 1);
      } else if (active.col > 0) {
        const oldIndex = active.col;
        const oldRow = active.row;
        reset();
        moveRowCol(oldRow, oldIndex - 1);
      }
      return true;
    }
    if (e.keyCode === KEYCODES.END && active.row !== -1) {
      //end
      e.preventDefault();
      const oldRow = active.row;
      reset();
      moveRowCol(
        e.ctrlKey ? internalResults.length - 1 : oldRow,
        config.length - 1
      );
      return true;
    }
    if (e.keyCode === KEYCODES.HOME && active.row !== -1) {
      //end
      e.preventDefault();
      const oldRow = active.row;
      reset();
      moveRowCol(e.ctrlKey ? 0 : oldRow, 0);
      return true;
    }

    return false;
  };
  const reset = () => {
    active.row = -1;
    active.col = -1;
  };
  const first = () => {
    reset();
    moveRowCol(0, 0);
  };

  return { reset, handleKeyPress, active, first } as IAutocompleteResultRender;
};

export { useResultGrid };
