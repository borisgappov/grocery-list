import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectHistory, selectItems } from './listSlice';
import { newGrocery } from '../shared/utils';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Form as BsForm } from "react-bootstrap"
import { append, update, remove } from './listSlice';
import ConfirmDialog from './ConfirmDialog';

function Entry() {

  const history = useNavigate();
  const items = useSelector(selectItems);
  const statusHistory = useSelector(selectHistory);

  const dispatch = useDispatch();

  let { id } = useParams();
  const isNew = !id;

  let initialValues = isNew ? newGrocery() : items.find(e => e.id == id);

  const [ranOut, setRanOut] = useState(initialValues.ranOut);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleDelete = () => setShowRemoveConfirm(true);

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      dispatch(remove(initialValues));
      history('/');
    }
    setShowRemoveConfirm(confirmed);
  }

  return (<>

    <ConfirmDialog title="Please confirm"
      message={`Do you really want to delete "${initialValues?.name}"?`}
      show={showRemoveConfirm}
      confirm={handleConfirm} />

    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Name is required';
        }
        if (!parseInt(values.priority)) {
          errors.priority = 'Priority is required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        values = { ...values, ranOut };
        if (id) {
          dispatch(update(values));
        } else {
          dispatch(append(values));
        }

        history('/');
      }}
    >
      {({ isSubmitting }) => (
        <Form className='p-3'>
          <Field type="hidden" name="id" />

          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <Field className="form-control" type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div className="pt-3 form-group">
            <label className="form-label" htmlFor="ranOut">Ran Out</label>
            <BsForm.Check style={{ fontSize: '150%' }} type="switch" name="ranOut" checked={ranOut} onChange={() => setRanOut(!ranOut)} />
          </div>

          <div className="pt-3 form-group">
            <label className="form-label" htmlFor="priority">Priority</label>

            <Field name="priority" as="select" className="form-select">
              <option value="0">Select priority</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <ErrorMessage name="priority" component="div" />
          </div>

          <div className="pt-3 d-flex flex-row-reverse">
            <Button type="submit" variant="outline-primary" disabled={isSubmitting} className="m-2">Save</Button>
            {!isNew && <Button variant="outline-danger" className="m-2" onClick={handleDelete}>Delete</Button>}
          </div>
        </Form>
      )}
    </Formik>
    <hr />
    <div className="p-2">
      <h6>Status History</h6>

      {statusHistory[id] ? statusHistory[id].map(e =>
        <div key={Math.random()} className="d-flex">
          <div className='flex-grow-1'>{e.date}</div>
          <div className='flex-grow-1'>{e.value ? 'Ran Out' : 'Have'}</div>
        </div>) : 'Empty'
      }
    </div>
  </>
  )
}

export default Entry;
