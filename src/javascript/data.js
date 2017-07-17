var icon = 'https://s3-us-west-2.amazonaws.com/symphonypublicicons/logo_gmail_48px.png'
var logo= 'https://symphony.foundation/images/SymphonyLlcSymbol.png'

exports.messageMLV2 =
`<messageML>
    <h1>Header1</h1>
    <h2>Header2</h2>
    <h3>Header3</h3>
    <h4>Header4</h4>
    <h5>Header5</h5>
    <h6>Header6</h6>
    <div class="tempo-bg-color--theme-primary">This is <i>formatted</i> <b>text</b>.</div>
    <div class="tempo-bg-color--theme-accent">It adjusts to your theme's settings.</div>
    <div class="entity" data-entity-id="object01">here is my object</div>
    <div>
        <p>paragraph</p>
        <ul><li>list item 1</li></ul>
        <ul><li>list item 2</li></ul>
        <ol>
            <li>numbered item</li>
            <li>numbered item</li>
        </ol>
        <img src="https://symphony.foundation/images/SymphonyLlcSymbol.png"/>
        <a href="https://techcrunch.com/2017/05/16/symphony-a-messaging-app-backed-by-wall-st-gets-63m-at-a-1b-valuation/"><br/>Article link</a>
    </div>
    <table>
        <tbody>
            <tr><th>Mention</th><th>Cashtag</th><th>Hashtag</th></tr>
            <tr><td><mention uid="9826885173260"/></td><td><cash tag="goog"/></td><td><hash tag="GOT"/></td></tr>
        </tbody>
    </table>
</messageML>`


exports.staticEntityMessage =
`<messageML>
    <div class="entity" data-entity-id="staticTimer">
    Please install the Hello World application
    </div>
</messageML>`