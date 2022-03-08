import { VueWrapper } from "@vue/test-utils";

/**
 * Ensures calls exist for event. Throws error if no calls were made.
 * @param wrapper VTU Component Wrapper
 * @param event event name
 * @returns Array of array arguments for each call
 */
const getCalls = <Targs = unknown>(wrapper: VueWrapper<any>, event: string) => {
  const calls = wrapper.emitted<Targs>(event);
  if (!calls || calls.length === 0) {
    throw new Error("emitted should return an array");
  }
  return calls as Targs[];
};

export { getCalls };
