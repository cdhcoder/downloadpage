import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ReleaseNote from './ReleaseNote';
import MockAdapter from 'axios-mock-adapter';

describe('<ReleaseNote />', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 });
    mock.onGet('http://192.168.1.211:8080/api/releaseNotes').reply(200, {
        result: 1,
        data: [
            {
                version: 'TmaxOS 3.5.0 Release Note',
                file_name: '/release_note/TmaxOS_3.5.0_release-note.pdf'
            },
            {
                version: 'ToOffice 3.5.0 Release Note',
                file_name: '/release_note/ToOffice_3.5.0_release-note.pdf'
            }
        ]
    });
    
    it('calls get ReleaseNote API loads release note Data properly', async () => {
        const { getByText, getByRole } = render(<ReleaseNote />);
        await waitFor(() => getByRole('heading', { name: /Release Notes/i}));
        await waitFor(() => getByText(/TmaxOS 3.5.0 Release Note/i));
        await waitFor(() => getByText(/ToOffice 3.5.0 Release Note/i));
    });

    it('should download the file', async () => {
        const { getAllByText } = render(<ReleaseNote />);
        //await waitFor(() => expect(getAllByText('Click').length).toEqual(2));
        const clickNodes = await waitFor(() => getAllByText('Click'));
        expect(clickNodes.length).toEqual(2);
        //clickNodes.map(node => expect(node.getAttribute('href') === '/release_note/TmaxOS_3.5.0_release-note.pdf' || '/release_note/ToOffice_3.5.0_release-note.pdf' ? true : false).toBe(true));
        expect(clickNodes[0].getAttribute('href')).toBe('/release_note/TmaxOS_3.5.0_release-note.pdf');
        expect(clickNodes[1].getAttribute('href')).toBe('/release_note/ToOffice_3.5.0_release-note.pdf');
            
    });
});