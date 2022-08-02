import * as React from "react";
import { Container, Row, Form, Button, Col, Stack } from "react-bootstrap";
import * as debounce from "lodash.debounce";
import DefaultLayout from "@components/layout/defaultLayout";
import TodoModel, { TodoItem } from "@models/todoModel";
import { TodoCard } from "@components/todos/todoCard";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type ClickEvent = React.MouseEvent<HTMLButtonElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

export default () => {
  const [ todos, setTodos ] = React.useState<TodoItem[]>([]);
  // Subscribe to our storage, return the unsubscribe handler for when we unmount
  React.useEffect(() => TodoModel.subscribe(todos => setTodos(todos || [])), []);

  // Message Handling
  const [ message, setMessage ] = React.useState('');
  // Debounced change handler so we only re-render after they stop input for a time
  const onMessageChange = React.useMemo(
    () => debounce((e: ChangeEvent) => {
        const nextMessage = e.target.value;
        if (message !== nextMessage) {
          console.log('updating message value', message?.length, nextMessage?.length);
          setMessage(nextMessage);
        }
      }, 250),
    [message, setMessage]);
  // Cleanup debounce handler on unmount
  React.useEffect(() => () => onMessageChange.cancel(), []);


  // Add/Remove TODO Items
  const onAddNewItem = React.useCallback((e: ClickEvent | FormEvent) => {
    e.preventDefault();
    if (message) {
      TodoModel.create(message);
      setMessage('');
    }
    return false;
  }, [message, setMessage]);

  const onRemoveFirst = React.useCallback((e: ClickEvent) => {
    e.preventDefault();
    if (todos.length > 0) {
      TodoModel.delete(todos[0].id);
    }
  }, [todos]);

  return (
    <DefaultLayout>
      <section className="bg-light">
        <Form onSubmit={onAddNewItem}>
          <Container>
            <Row>
              <h1 className="text-center">To Do List</h1>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="todoForm.message">
                  <Form.Label>Add Todo</Form.Label>
                  <Form.Control type="text" placeholder="Add new todo" autoComplete="off" onChange={onMessageChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                  <Button variant="primary" onClick={onAddNewItem}>Submit</Button>
                  <Button className="m-2" variant="danger" onClick={onRemoveFirst}>Remove</Button>
              </Col>
            </Row>
          </Container>
          <Container className="mt-3">
            <Stack gap={3}>
              {todos.map(todo => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </Stack>
          </Container>
        </Form>
      </section>
    </DefaultLayout>
  );
};
