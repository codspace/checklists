import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { createChecklist } from '../../service';

export default function Create(props) {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        const form = event.currentTarget;

        if (form.checkValidity()) {
            try {
                const checklist = await createChecklist({ title });
                props.history.push(`/view/${checklist._id}`);
            } catch (err) {
                if (!err.message) {
                    err.message = 'Failed to add the checklist item........';
                }

                console.log(err);
            }
        };
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={100} />
                    <Form.Text className="text-muted">
                        Give a title to your list, so you remember what it is for.
                    </Form.Text>
                </Form.Group >
                <Button variant="primary" type="submit" data-testid="create-button">
                    Create
                </Button>
            </Form>
        </div>
    )
}