/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Action, Todo, ActionTypes } from '../actions';

export const todosReducer = (state: Todo[] = [], action: Action) => {
  console.log('action.type:', action);
  switch (action.type) {
    case ActionTypes.fetchTodos:
      return action.payload;
    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
