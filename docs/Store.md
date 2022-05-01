# Store API Documentation

### By Malay Bhavsar

<p><b>Base Path:</b> {{url}}/store</p>
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
    <td>/product</td>
    <td>POST</td>
    <td>Yes</td>
    <td>name, options:[{data, price, availableStock}], [descriptions], [images], {specs}, [offers]</td>
    <td>To add a new product listing to the store</td>
</tr>
<tr>
    <td>2</td>
    <td>/product</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>productId, updates:{...}</td>
    <td>To update product data in the post</td>
</tr>
<tr>
    <td>3</td>
    <td>/product</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>productId</td>
    <td>To delete product listing</td>
</tr>
<tr>
    <td>4</td>
    <td>/stock</td>
    <td>POST</td>
    <td>Yes</td>
    <td>productId, optionId, availableStock</td>
    <td>To update the available stock of that specific product</td>
</tr>
<tr>
    <td>5</td>
    <td>/product/option</td>
    <td>POST</td>
    <td>Yes</td>
    <td>productId, data, price, availableStock</td>
    <td>Add a new Option for that existing product listing</td>
</tr>
<tr>
    <td>6</td>
    <td>/product/option</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>productId, optionId, data, price</td>
    <td>Update option of an existing product</td>
</tr>
<tr>
    <td>7</td>
    <td>/product/option</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>productId, optionId</td>
    <td>Remove a specific option for the existing product listed</td>
</tr>
<tr>
    <td>8</td>
    <td>/cart</td>
    <td>POST</td>
    <td>Yes</td>
    <td>productId, optionId, qty</td>
    <td>Add the specific product option to cart</td>
</tr>
<tr>
    <td>9</td>
    <td>/cart</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>productId, optionId, qty</td>
    <td>Update cart product quantity</td>
</tr>
<tr>
    <td>10</td>
    <td>/cart</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>productId, optionId</td>
    <td>Remove prosuct with selected option from the cart</td>
</tr>
<tr>
    <td>11</td>
    <td>/order</td>
    <td>POST</td>
    <td>Yes</td>
    <td>txnId, type, amount</td>
    <td>To place the order for all the items in the cart</td>
</tr>
<tr>
    <td>12</td>
    <td>/order</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>orderId</td>
    <td>Cancel a particular order if possible</td>
</tr>
</table>
