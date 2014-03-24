<?php
/*
  echo ('<pre>');
  print_r($_FILES);
  echo ('</pre>');
*/
  
  if (!array_key_exists('SpbImagerFile', $_FILES))
  {
     echo ('HTTP 1.1 404 NOT FOUND');
     exit("ERROR No 'SpbImagerFile' file found");
  }
  
  if ($_FILES['SpbImagerFile']['error'] != UPLOAD_ERR_OK)
  {
     echo ('HTTP 1.1 404 NOT FOUND');
     exit("ERROR Code " . $_FILES['SpbImagerFile']['error']);
  }
  
	$pos = strpos($_FILES['SpbImagerFile']['name'],'Img');
  if ($pos > 0)
  {
	$dest = './received/Imager.jpg';
  }
  else
  {
	$dest = './received/Sig.bmp';  
  }
  if (!move_uploaded_file ($_FILES['SpbImagerFile']['tmp_name'], $dest))
  {
    echo ('HTTP 1.1 404 NOT FOUND');
    exit("ERROR Cannot move " . $_FILES['SpbImagerFile']['tmp_name'] . " to " . $dest);
  }
  
  echo ('HTTP 1.1 200 ');
  printf ('OK %d bytes received', $_FILES['SpbImagerFile']['size']);
?>		