import {NextApiRequest, NextApiResponse} from 'next'
import AWS from 'aws-sdk'
import moment from 'moment'
import { transform } from '@babel/standalone'

// Just adding random packages to this route only

export default async (req: NextApiRequest, res: NextApiResponse) => {
  AWS.config.update({region: "us-west-2"});
  const today = moment()
  const result = transform("console.log('hello');", {
    presets: ['env'],
  })
  return res.json({
    message: 'Hello'
  })
}
