import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';
import usePrevious from '../hooks/usePrevious';
interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

const __App = ({ todos, fetchTodos, deleteTodo }: AppProps): JSX.Element => {
  const [fetching, setFetching] = useState(false);
  const prevTodos = usePrevious(todos);

  const handleFetch = (): void => {
    setFetching(true);
    fetchTodos();
  };

  const handleDelete = (id: number): void => {
    deleteTodo(id);
  };

  const renderList = (): JSX.Element[] => {
    return todos.map((todo: Todo) => {
      return (
        <div onClick={() => handleDelete(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  };

  useEffect(() => {
    setFetching(false);
  }, [todos]);

  return (
    <div>
      <button onClick={handleFetch}>Fetch</button>
      {fetching ? 'Loading' : null}
      {renderList()}
    </div>
  );
};

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(__App);
