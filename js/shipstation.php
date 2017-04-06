<?php
/**
 * Created by PhpStorm.
 * User: hecto
 * Date: 4/3/2017
 * Time: 9:05 AM
 */

public function shipstation($data = null){ //Allow ShipStation to Pull Order Information
	$this->load->model('customer_model');
	$this->output->set_content_type('application_json');
	$result = $this->customer_model->get($data);
	foreach ($result as $res){
		$fields = array(
			'OderKey'=>$res['Authorization'].$res['TransactID'],
			'OrderNumber'=> $res['OrderID'],
			'OrderDate'=>$res['OrderDate'],
			'OrderStatus'=>$res['OrderStatus'],
			'OrderTotal'=> $res['OrderTotal'],
			'shippingAmount'=> $res['ShippingAmt'],
			'customerId'=>$res['CustomerID'],
			'customerEmail'=>$res['Email'],
			'billTo'=> array (
				'Name'=>$res['FirstName'].' '.$res['LastName']),
			'ShipTo'=> array (
				'Name'=>$res['FirstName'].' '.$res['LastName'],
				'street1'=>$res['ShipAddress1'],
				'street2'=> null,
				'city'=> $res['ShipCity'],
				'state'=> $res['ShipState'],
				'postalcode'=> $res['ShipPostalCode'],
				'country'=> 'US'
			),
			'Items'=> array(
				array (
					'SKU'=>$res['SKU'],
					'Name'=>$res['PName'],
					'Quantity'=> $res['Quantity'],
					'UnitPrice'=>$res['Price']
				)
			)
		);
	}
	$field_string = json_encode($fields);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://ssapi.shipstation.com/orders/createorder");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, FALSE);
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $field_string);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		"Content-Type: application/json",
		"Authorization: Basic QyNTE3MmMxYTA="
	));

	$response = curl_exec($ch);
	curl_close($ch);
}//shipstation function//------------------------------------------------------------------------------