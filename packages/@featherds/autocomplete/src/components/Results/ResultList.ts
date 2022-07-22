import { reactive, nextTick } from "vue";
import { Code } from "@featherds/utils/keys";
import { IAutocompleteItemType, IAutocompleteResultRender } from "../types";
const useResultList = () => {
  const active = reactive({
    row: -1,
  });

  const moveMenuIndex = (index: number) => {
    nextTick(() => {
      active.row = index;
    });
  };
  const handleKeyPress = (
    e: KeyboardEvent,
    internalResults: IAutocompleteItemType[]
  ) => {
    //menu navigation
    if (e.code === Code.DOWN) {
      //down
      e.preventDefault();
      if (active.row === -1) {
        reset();
        moveMenuIndex(0);
      } else if (active.row + 1 <= internalResults.length - 1) {
        const oldIndex = active.row;
        reset();
        moveMenuIndex(oldIndex + 1);
      }
      return true;
    }
    if (e.code === Code.UP) {
      //up
      e.preventDefault();
      if (active.row === 0) {
        reset();
      } else if (active.row > 0) {
        const oldIndex = active.row;
        reset();
        moveMenuIndex(oldIndex - 1);
      }
      return true;
    }

    return false;
  };
  const reset = () => {
    active.row = -1;
  };
  const first = () => {
    active.row = 0;
  };

  return { reset, handleKeyPress, active, first } as IAutocompleteResultRender;
};

export { useResultList };
