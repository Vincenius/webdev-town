import mjml2html from 'mjml'
import { getByQuery } from '../../utils/database'

const handler = async (req, res) => {
  const { intro, fromDate, toDate, number } = JSON.parse(req.body)
  const query = {
    created_at: { $lte: toDate, $gte: fromDate }
  };
  const data = await getByQuery({ query })

  const sortedData = data.sort((a, b) => a.sponsored ? -1 : b.created_at.localeCompare(a.created_at))

  let markdown = `<mjml>
    <mj-head>
      <mj-attributes>
        <mj-text font-size="16px" font-family="helvetica" />
        <mj-button font-family="helvetica" />
      </mj-attributes>
    <mj-style> a { color: #017a8c; } .bg > table { background-image: linear-gradient(158deg, rgba(84, 84, 84, 0.03) 0%, rgba(84, 84, 84, 0.03) 20%,rgba(219, 219, 219, 0.03) 20%, rgba(219, 219, 219, 0.03) 40%,rgba(54, 54, 54, 0.03) 40%, rgba(54, 54, 54, 0.03) 60%,rgba(99, 99, 99, 0.03) 60%, rgba(99, 99, 99, 0.03) 80%,rgba(92, 92, 92, 0.03) 80%, rgba(92, 92, 92, 0.03) 100%),linear-gradient(45deg, rgba(221, 221, 221, 0.02) 0%, rgba(221, 221, 221, 0.02) 14.286%,rgba(8, 8, 8, 0.02) 14.286%, rgba(8, 8, 8, 0.02) 28.572%,rgba(52, 52, 52, 0.02) 28.572%, rgba(52, 52, 52, 0.02) 42.858%,rgba(234, 234, 234, 0.02) 42.858%, rgba(234, 234, 234, 0.02) 57.144%,rgba(81, 81, 81, 0.02) 57.144%, rgba(81, 81, 81, 0.02) 71.42999999999999%,rgba(239, 239, 239, 0.02) 71.43%, rgba(239, 239, 239, 0.02) 85.71600000000001%,rgba(187, 187, 187, 0.02) 85.716%, rgba(187, 187, 187, 0.02) 100.002%),linear-gradient(109deg, rgba(33, 33, 33, 0.03) 0%, rgba(33, 33, 33, 0.03) 12.5%,rgba(147, 147, 147, 0.03) 12.5%, rgba(147, 147, 147, 0.03) 25%,rgba(131, 131, 131, 0.03) 25%, rgba(131, 131, 131, 0.03) 37.5%,rgba(151, 151, 151, 0.03) 37.5%, rgba(151, 151, 151, 0.03) 50%,rgba(211, 211, 211, 0.03) 50%, rgba(211, 211, 211, 0.03) 62.5%,rgba(39, 39, 39, 0.03) 62.5%, rgba(39, 39, 39, 0.03) 75%,rgba(55, 55, 55, 0.03) 75%, rgba(55, 55, 55, 0.03) 87.5%,rgba(82, 82, 82, 0.03) 87.5%, rgba(82, 82, 82, 0.03) 100%),linear-gradient(348deg, rgba(42, 42, 42, 0.02) 0%, rgba(42, 42, 42, 0.02) 20%,rgba(8, 8, 8, 0.02) 20%, rgba(8, 8, 8, 0.02) 40%,rgba(242, 242, 242, 0.02) 40%, rgba(242, 242, 242, 0.02) 60%,rgba(42, 42, 42, 0.02) 60%, rgba(42, 42, 42, 0.02) 80%,rgba(80, 80, 80, 0.02) 80%, rgba(80, 80, 80, 0.02) 100%),linear-gradient(120deg, rgba(106, 106, 106, 0.03) 0%, rgba(106, 106, 106, 0.03) 14.286%,rgba(67, 67, 67, 0.03) 14.286%, rgba(67, 67, 67, 0.03) 28.572%,rgba(134, 134, 134, 0.03) 28.572%, rgba(134, 134, 134, 0.03) 42.858%,rgba(19, 19, 19, 0.03) 42.858%, rgba(19, 19, 19, 0.03) 57.144%,rgba(101, 101, 101, 0.03) 57.144%, rgba(101, 101, 101, 0.03) 71.42999999999999%,rgba(205, 205, 205, 0.03) 71.43%, rgba(205, 205, 205, 0.03) 85.71600000000001%,rgba(53, 53, 53, 0.03) 85.716%, rgba(53, 53, 53, 0.03) 100.002%),linear-gradient(45deg, rgba(214, 214, 214, 0.03) 0%, rgba(214, 214, 214, 0.03) 16.667%,rgba(255, 255, 255, 0.03) 16.667%, rgba(255, 255, 255, 0.03) 33.334%,rgba(250, 250, 250, 0.03) 33.334%, rgba(250, 250, 250, 0.03) 50.001000000000005%,rgba(231, 231, 231, 0.03) 50.001%, rgba(231, 231, 231, 0.03) 66.668%,rgba(241, 241, 241, 0.03) 66.668%, rgba(241, 241, 241, 0.03) 83.33500000000001%,rgba(31, 31, 31, 0.03) 83.335%, rgba(31, 31, 31, 0.03) 100.002%),linear-gradient(59deg, rgba(224, 224, 224, 0.03) 0%, rgba(224, 224, 224, 0.03) 12.5%,rgba(97, 97, 97, 0.03) 12.5%, rgba(97, 97, 97, 0.03) 25%,rgba(143, 143, 143, 0.03) 25%, rgba(143, 143, 143, 0.03) 37.5%,rgba(110, 110, 110, 0.03) 37.5%, rgba(110, 110, 110, 0.03) 50%,rgba(34, 34, 34, 0.03) 50%, rgba(34, 34, 34, 0.03) 62.5%,rgba(155, 155, 155, 0.03) 62.5%, rgba(155, 155, 155, 0.03) 75%,rgba(249, 249, 249, 0.03) 75%, rgba(249, 249, 249, 0.03) 87.5%,rgba(179, 179, 179, 0.03) 87.5%, rgba(179, 179, 179, 0.03) 100%),linear-gradient(241deg, rgba(58, 58, 58, 0.02) 0%, rgba(58, 58, 58, 0.02) 25%,rgba(124, 124, 124, 0.02) 25%, rgba(124, 124, 124, 0.02) 50%,rgba(254, 254, 254, 0.02) 50%, rgba(254, 254, 254, 0.02) 75%,rgba(52, 52, 52, 0.02) 75%, rgba(52, 52, 52, 0.02) 100%),linear-gradient(90deg, #ffffff,#ffffff); !important }; </mj-style>
  </mj-head>
  <mj-body>
    <mj-section css-class="bg" border-radius="0 0 10px 10px">
      <mj-column>
        <mj-image src="https://webdev.town/logo.png" width="100px" padding-bottom="20px" alt="WebDev Town" fluid-on-mobile="true" />
        <mj-text align="center" color="#1d1d1d">
          <h2>Web Development Resources #${number}</h2>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>Here's the summary of this weeks <a href="https://webdev.town">WebDev Town</a> resources.</mj-text>
        <mj-text>${intro}</mj-text>
      </mj-column>
    </mj-section>
      `
      for (let i = 0; i < sortedData.length; i = i+2) {
        const item = sortedData[i]
        const item2 = sortedData[i+1]

        const baseUrl = process.env.S3_CDN
        const image1 = `${baseUrl}${item.image.replace('../assets', '').replace('/weekly', '')}`
        const image2 = item2 && `${baseUrl}${item2.image.replace('../assets', '').replace('/weekly', '')}`

        markdown= `${markdown}
        <mj-section>
          <mj-column>
            <mj-image src="${image1}" href="${item.link}" fluid-on-mobile="true" border="1px solid #BDBDBD" />
            <mj-text>
              ${item.sponsored ? '<p style="margin: 0; color: #616161">Sponsored</p>' : ''}
              <h2 style="margin-top:5px;"><a href="${item.link}" style="color: #000; text-decoration: none;">${item.title}</a></h2>
              <p>${item.description}</p>
              <a href="${item.link}">Visit!</a>
            </mj-text>
            <mj-spacer height="20px" />
            <mj-divider border-width="1px" border-color="lightgrey" />
            <mj-spacer height="40px" />
          </mj-column>
          ${item2
            ? `<mj-column>
            <mj-image src="${image2}" href="${item2.link}" fluid-on-mobile="true" border="1px solid #BDBDBD" />
            <mj-text>
              ${item2.sponsored ? '<p style="margin: 0; color: #616161">Sponsored</p>' : ''}
              <h2 style="margin-top:5px;"><a href="${item2.link}" style="color: #000; text-decoration: none;">${item2.title}</a></h2>
              <p>${item2.description}</p>
              <a href="${item2.link}">Visit!</a>
            </mj-text>
            <mj-spacer height="20px" />
            <mj-divider border-width="1px" border-color="lightgrey" />
          </mj-column>`
            : '<mj-column> </mj-column>'}
        </mj-section>`
      }

      markdown = `${markdown}
        <mj-section>
          <mj-column>
            <mj-text>Enjoyed this newsletter? You can support me by</mj-text>
            <mj-text>💌 replying and letting me know</mj-text>
            <mj-text>💸 booking a <a href="https://webdev.town/sponsorship/">sponsored post</a></mj-text>
            <mj-text>🚀 helping me grow by sharing it with your friends and colleagues</mj-text>
            <mj-text></mj-text>
            <mj-text line-height="0">Cheers,</mj-text>
            <mj-text line-height="0">Vincent from <a href="https://webdev.town">WebDev Town</a></mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-text align="center">
            <a href="{$unsubscribe}">Unsubscribe</a><span> | </span><a href="{$url}">View in browser</a><span> | </span><a href="{$forward}">Forward</a>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>`

  const htmlOutput = mjml2html(markdown)

  res.status(200).json({ result: htmlOutput.html })
}

export default handler
