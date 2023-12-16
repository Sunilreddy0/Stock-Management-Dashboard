import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StockList from './StockList';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('StockList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('displays stock graph on item click', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { date: '2023-12-01', close: 150.25 },
            { date: '2023-12-02', close: 152.38 },
          ]),
      })
    );

    const { getByText } = render(<StockList />);

    fireEvent.click(getByText('AAPL: Apple Inc. - $150.25'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(getByText('Date')).toBeInTheDocument();
      expect(getByText('Price')).toBeInTheDocument();
    });
  });
});