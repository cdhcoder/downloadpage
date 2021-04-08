import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Utility from './Utility';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('<Utility />', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 });
    mock.onGet('http://192.168.1.211:8080/api/utility').reply(200, {
        result: 1,
        data: [
            {
                name: '한글2014',
                file_name: '-',
                guide: '/manual/TmaxOS_hancom_install-guide_2.pdf'
            },
            {
                name: 'Rufus2.11',
                file_name: '/Util/rufus-2.11.exe',
                guide: '-'
            }
        ]
    });
    it('calls get Utility API loads utilies data properly', async () => {
        const { getByText, debug } = render(<Utility />);
        await waitFor(() => expect(getByText('Utility').id).toBe('Utilities'));
        await waitFor(() => getByText('한글2014'));
        await waitFor(() => expect(getByText('설치/실행 가이드').getAttribute('href')).toBe('/manual/TmaxOS_hancom_install-guide_2.pdf'));
        await waitFor(() => getByText('Rufus2.11'));
        await waitFor(() => expect(getByText('Download').getAttribute('href')).toBe('/Util/rufus-2.11.exe'));
        debug();
    });
});