/**
 * A composable function that provides draggable behavior.
 *
 * @returns An object containing the following properties and methods:
 *   - `isDragging`: A ref indicating whether the element is currently being dragged.
 *   - `position`: A reactive object representing the current position of the element.
 *   - `beginDrag`: A function that starts the drag operation.
 *   - `continueDrag`: A function that updates the position of the element while dragging.
 *   -    taking an optional scale parameter to adjust the drag speed.
 *   - `endDrag`: A function that ends the drag operation.
 */
import { reactive, ref } from "vue";

export const useDraggable = () => {
  const isDragging = ref(false);
  const eventPos = { x: 0, y: 0 };
  const startDragPos = { x: 0, y: 0 };
  const position = reactive({ x: 0, y: 0 });

  const beginDrag = (event: MouseEvent) => {
    // middle mouse wheel
    if (event.buttons != 4) return;
    console.log("beginDrag", "eventPos", eventPos, "position", position);
    isDragging.value = true;
    eventPos.x = event.clientX;
    eventPos.y = event.clientY;
    startDragPos.x = position.x;
    startDragPos.y = position.y;
  };

  const continueDrag = (event: MouseEvent, scale: number = 1) => {
    if (!isDragging.value) return;
    position.x = startDragPos.x + (event.clientX - eventPos.x) / scale;
    position.y = startDragPos.y + (event.clientY - eventPos.y) / scale;
    console.log("continueDrag", position);
  };

  const endDrag = () => {
    isDragging.value = false;
  };

  return {
    isDragging,
    position,
    beginDrag,
    continueDrag,
    endDrag,
  };
};
