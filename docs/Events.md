# Note API Documentation

### By Malay Bhavsar

<p>Base Path: {{url}}/event</p>
<table>
    <tr>
        <th>Sr No</th>
        <th>Route</th>
        <th>Method</th>
        <th>Token Required</th>
        <th>Data</th>
        <th>Description</th>
    </tr>
<tr>
    <td>1</td>
    <td>/</td>
    <td>GET</td>
    <td>Yes</td>
    <td>userId^, registered^</td>
    <td>TO get the list of Events.
    Pass userId of a specific user to get list of events of that user.<br/>
    Pass registered = '1' to get the list of events you are registered in</td>
</tr>
<tr>
    <td>2</td>
    <td>/</td>
    <td>POST</td>
    <td>Yes</td>
    <td>category, title, description, [image], [tags], venue, date, paid, price, deadline, [rules]</td>
    <td>To Enlist an event of your Own</td>
</tr>
<tr>
    <td>3</td>
    <td>/</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>eventId, ^/send update params/</td>
    <td>To update the event data</td>
</tr>
<tr>
    <td>4</td>
    <td>/</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>eventId</td>
    <td>To delete the event</td>
</tr>
<tr>
    <td>5</td>
    <td>/register</td>
    <td>POST</td>
    <td>Yes</td>
    <td>eventId</td>
    <td>To register for the event</td>
</tr>
<tr>
    <td>6</td>
    <td>/register</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>eventId</td>
    <td>To unregister for the event</td>
</tr>
</table>

<br/>
<b><i>^ = optional paramater for the request</i><b>
