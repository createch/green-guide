<?php

header('content-type: application/json; charset=utf-8');

$q = $_GET['q'];
$id = $_GET['id'];

$url = "http://api.goodguide.com/search.xml?api_key=xghpskqxrn6u6pdpxr83aznu&api_version=1.0&api_format=simple";

$req = $url . "&q=" . $q;

if (isset($id))
	$req = $url . "&id=" . $id;

$ch = curl_init($req);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
curl_setopt($ch, CURLOPT_FAILONERROR,1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));

$output = curl_exec($ch);

$xml = simplexml_load_string($output);

$json = json_encode($xml);

echo isset($_GET['callback'])
? "{$_GET['callback']}($json)"
: $json;

?>