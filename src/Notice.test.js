import { render, waitFor } from '@testing-library/react';
import Notice from './Notice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('<Notice/>', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 });    //200ms delay

    //dummy response
    mock.onGet('http://192.168.1.211:8080/api/notice').reply(200, {
        result: 1,
        data: [{
            version: 'TmaxOS 21 업데이트',
            date: '2021.03.04'
        }]
    });

    it('matches snapshot', async () => {
        const { container } = render(<Notice/>);
        expect(container).toMatchSnapshot();
    });

    it('calls get Notice API loads notice data properly', async () => {
        const { debug, getByText } = render(<Notice/>);
        await waitFor(() => getByText('Notice'));
        await waitFor(() => getByText('2021.03.04'));
        await waitFor(() => getByText(/TmaxOS 21 업데이트/i));
        debug();
    });
});