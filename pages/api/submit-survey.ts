import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const surveyData = req.body;
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbxOiYgQWqhPB9NSuCAbMeqv7oFrM8i1vNiv6CcawXEHjC4Z9lo7rq-e-A4Qb7WYu7om/exec';

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        res.status(200).json({ message: 'Survey data received successfully' });
      } else {
        res.status(500).json({ message: 'Failed to submit survey data' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error submitting survey data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
