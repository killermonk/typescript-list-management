import TodoModel, { TodoItem } from "@models/todoModel";
import classnames from "classnames";
import * as React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

interface TodoCardProps {
    todo: TodoItem,
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    const { id, message, done } = todo;
    const markDone = React.useCallback(() => {
        TodoModel.markDone(id);
    }, [id]);

    const buttonVariant = done ? 'outline-secondary' : 'outline-success';

    return (
        <Container className="bg-white border">
            <Row className="py-1">
                <Col className="d-flex">
                    <div className={classnames("vertical-center text-wrap", { "strike": done })}>{message}</div>
                </Col>
                <Col className="flex-small d-flex">
                    <Button
                        variant={buttonVariant}
                        className="vertical-center text-right"
                        disabled={done}
                        onClick={markDone}>
                            ✓
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
