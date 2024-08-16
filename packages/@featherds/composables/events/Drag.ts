/**
 * A composable function that provides draggable behavior.
 *
 * @returns An object containing the following properties and methods:
 *   - `isDragging`: A ref indicating whether the element is currently being dragged.
 *   - `position`: A reactive object representing the current position of the element.
 *   - `beginDrag`: A function that starts the drag operation.
 *   - `continueDrag`: A function that updates the position of the element while dragging.
 *   - `endDrag`: A function that ends the drag operation.
 */
import { reactive, ref } from "vue";

export const useDraggable = () => {
  const isDragging = ref(false);
  const startPos = { x: 0, y: 0 };
  const position = reactive({ x: 0, y: 0 });

  const beginDrag = (event: MouseEvent) => {
    console.log("beginDrag", event.clientX, event.clientY);
    isDragging.value = true;
    document.addEventListener("mousemove", continueDrag);
    document.addEventListener("mouseup", endDrag);
    startPos.x = event.clientX - position.x;
    startPos.y = event.clientY - position.y;
  };

  const beginDragShift = (event: MouseEvent) => {
    if (!event.shiftKey) return;
    console.log("beginDragShift", event.clientX, event.clientY);
    isDragging.value = true;
    document.addEventListener("mousemove", continueDrag);
    document.addEventListener("mouseup", endDrag);
    startPos.x = event.clientX - position.x;
    startPos.y = event.clientY - position.y;
  };

  const continueDrag = (event: MouseEvent) => {
    if (!isDragging.value) return;
    console.log("continueDrag", event.clientX, event.clientY);
    position.x = event.clientX - startPos.x;
    position.y = event.clientY - startPos.y;
  };

  const endDrag = () => {
    console.log("endDrag");
    isDragging.value = false;
    document.removeEventListener("mousemove", continueDrag);
    document.removeEventListener("mouseup", endDrag);
  };

  return {
    isDragging,
    position,
    beginDrag,
    beginDragShift,
    continueDrag,
    endDrag,
  };
};
