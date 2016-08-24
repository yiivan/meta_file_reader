## Requires:

	Python 2.7.6
	Pip
	Django 1.10

## Function:

	This is a program that reads meta files and renders them in a table in the front-end.

## Steps:

1. Obtain the Meta_File_Reader application.

2. Place sample meta-files into:   
	 Meta_File_Reader/Meta_File_Reader/meta_files   
	 Each file has to be a list of JSON records and in the '.json' format.

3. Inside the first layer of the Meta_File_Reader folder, run the server in the terminal:   
   python manage.py runserver

4. Open a web browser(i.e. Chrome) and in the URL type:   
   http://localhost:8000/

5. The data are rendered in a table and each row is color-coded based on the record's threat level(rating).

6. The fields can be sorted by clicking the table header for each field.

7. The data can be filtered by selecting the time-period dropdown at the upper left of the table.

8. When a new file is added or deleted in the directory, an alert will pop up in a few seconds to tell the user to reload the table.
