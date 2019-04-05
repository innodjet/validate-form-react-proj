import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Form from '../components/Form';
import Message from '../components/Message';
import expect from 'expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { spy } from 'sinon';


configure({ adapter: new Adapter() });

describe('Form Validation <App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

	it('check default message', () => {
  	const app = mount(<App />);
  	let txt = app.find('.message').text()
  	expect(txt).toEqual("Form is Incomplete!");
	});

  it('check if all forms fields exist', () => {
    const wrapper = mount(<Form />);
    let len = wrapper.find('input').length;
    expect(len).toEqual(4);
  });

  it('check entire form validation when the form is valid', () => {
    let formSpy = spy();
    const form = mount(<Form isFormValid={formSpy} />);
    form.find('.name').simulate('change', { target: { value: 'sasrank' } });
    form.find('.email').simulate('change', { target: { value: 'aasdbc@xyz.com' } });
    form.find('.phone').simulate('change', { target: { value: '9856756756' } });
    form.find('.url').simulate('change', { target: { value: 'http://google.com' } });
    form.find('.button').simulate('click');
    expect(formSpy.calledWith(true)).toEqual(true);
  });

  it('check entire form validation when the phone number is invalid', () => {
    let formSpy = spy();
    const form = mount(<Form isFormValid={formSpy} />);
    form.find('.name').simulate('change', { target: { value: 'ui' } });
    form.find('.email').simulate('change', { target: { value: 'abc@xyz.com' } });
    form.find('.phone').simulate('change', { target: { value: '56756756' } });
    form.find('.url').simulate('change', { target: { value: 'http://google.com' } });
    form.find('.button').simulate('click');
    expect(formSpy.calledWith(true)).toEqual(false);
  });

  it('check entire form validation when the email is invalid', () => {
    let formSpy = spy();
    const form = mount(<Form isFormValid={formSpy} />);
    form.find('.name').simulate('change', { target: { value: 'ui' } });
    form.find('.email').simulate('change', { target: { value: 'abc@xyz.' } });
    form.find('.phone').simulate('change', { target: { value: '56756756' } });
    form.find('.url').simulate('change', { target: { value: 'http://google.com' } });
    form.find('.button').simulate('click');
    expect(formSpy.calledWith(true)).toEqual(false);
  });

  it('check entire form validation when the url is invalid', () => {
    let formSpy = spy();
    const form = mount(<Form isFormValid={formSpy} />);
    form.find('.name').simulate('change', { target: { value: 'ui' } });
    form.find('.email').simulate('change', { target: { value: 'abc@xyz.com' } });
    form.find('.phone').simulate('change', { target: { value: '56756756' } });
    form.find('.url').simulate('change', { target: { value: 'ht' } });
    form.find('.button').simulate('click');
    expect(formSpy.calledWith(true)).toEqual(false);
  });

  it('check form validation when the entire form is invalid', () => {
    let formSpy = spy();
    const form = mount(<Form isFormValid={formSpy} />);
    form.find('.name').simulate('change', { target: { value: '' } });
    form.find('.email').simulate('change', { target: { value: '33' } });
    form.find('.phone').simulate('change', { target: { value: '567567560' } });
    form.find('.url').simulate('change', { target: { value: 'h9' } });
    form.find('.button').simulate('click');
    expect(formSpy.calledWith(true)).toEqual(false);
  });
});