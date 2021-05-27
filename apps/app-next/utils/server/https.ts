import * as https from 'https';
import { URL } from 'url';

export function get<T>(
  url: string | URL,
  options: https.RequestOptions
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    https
      .get(url, options, (res) => {
        const data = [];
        res.on('data', (chunk) => {
          data.push(chunk);
        });

        res.on('end', () =>
          resolve(JSON.parse(Buffer.concat(data).toString('utf-8')))
        );
      })
      .on('error', (err) => reject(err));
  });
}
