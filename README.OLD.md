
# Gutenberg Block Elements Library
A library of classes for simpler gutenberg block creation

# Capabilities
 - <a href="#usage-text-input">Input: TEXT </a>
 - <a href="#usage-select-input">Input: SELECT </a>
 - <a href="#usage-datetime-input">Input: DATETIME </a>
 - <a href="#usage-image-input">Input: IMAGE </a>
 - <a href="#usage-color-input">Input: COLOR </a>
 - <a href="#usage-checkbox-input">Input: CHECKBOX </a>
 -  <a href="#usage-radiogroup-input">Input: RADIO BUTTON GROUP </a>
 - <a href="#usage-fontsizepicker-tool"> Tool: FONT SIZE PICKER </a>
 -  <a href="#usage-alignment-tool"> Tool: ALIGNMENT TOOL </a>
 - <a href="#usage-links">Custom Image Library (gallery)</a>
 - <a href="#usage-links">Custom Links Library</a>
 - <a href="#usage-list">Custom Generic List</a>
# Elements Classnames

    /* INPUT */
        TextInput(this.props);
        SelectInput(this.props);
        DateTimeInput(this.props);
        ImageInput(this.props);
        ColorInput(this.props);
        CheckBoxInput(this.props);
        RadioGroupInput(this.props);
    /* TOOLS */
        FontSizePickerInput(this.props);
    /* MISC */     
        Gallery(_props);
        Link(_props);
        List(_props);
# Important

Use attribute 

    dummy:{
        type:"string"
    }
on each block for correct work of library, otherwise some changes can stay unsaved!
Example:

    attributes: {
                text:{type:"string"},
                /* here it is*/
                dummy:{type:"string"},
                /* - - - - - - - - - */
                background:{type:"string"},
                imagesssss:{type:"array"},
                linkssssss:{type:"array"},
                bg_color:{type:"string"},
                side:{type:"string"}
    },
# Usage: TEXT INPUT
Signature:

    init(name,label_text)

Example:
   

    attributes: {
                text:{type:"string"},
                dummy:{type:"string"}
    },
    ...
    edit: function(props) 
        {   
            return new TextInput(props).init("text","Text:");
            /* OR */
            
            var textbox = new TextInput(props);
            return textbox.init("text","Text:")
        }


@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input

Returns REACTJS object with all needed stuff for text input. So, user only needs to enter the text. 
![
](https://i.imgur.com/hMcmOpu.png)

07-22-2019: Added an ability to override the input formatting controls, signature:

    formatting_controls()
    {
        return [ 'bold', 'italic', 'strikethrough' , 'link'];
    }
Example:

    var input = new TextInput(props);
    input.formatting_controls = function()
    {
      return [ 'bold', 'italic', 'strikethrough'];
    }
    return input.init("embed_url",props.attributes.embed_type + " URL:");
07-22-2019: Added an ability to render plain text input(to prevent automatic link parsing / etc, must be used just for plain text), an example:

    var input = new TextInput(props);
    input.plain = true;
    return input.init("embed_url",props.attributes.embed_type + " URL:");

# Usage: SELECT INPUT
Signature:
 

    init(name,label_text,values)

Example:
   

    attributes: {
                dummy:{type:"string"},
                side:{type:"string"}
    },
    ...
    edit: function(props) 
        {
	        return new SelectInput(props).init("side","Select side:",["left","right"]);
            /* OR */
            
            var select = new SelectInput(props);
            return select.init("side","Select side:",["left","right"])
        }

 
@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input
<br>@values - array - specify the options for select input here

Returns REACTJS object with all needed stuff for select input. So, user only needs to select a value. 
![
](https://i.imgur.com/aTworCZ.png)
# Usage: DATETIME INPUT
Signature:

    init(name,label_text)

Example:
   

    attributes: {
                date_time:{type:"string"},
                dummy:{type:"string"}
    },
    ...
    edit: function(props) 
        {
            return new DateTimeInput(props).init("date_time","Select date & time:");
            /* OR */
            
            var datetime = new DateTimeInput(props);
            return datetime.init("date_time","Select date & time:");
        }

 How is datetime stored? As string:

     2019-04-12T11:56:59

@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input

Returns REACTJS object with all needed stuff for date time input. So, user only needs to select the needed date and time. 

   ![
](https://i.imgur.com/i54TUQo.png)

# Usage: IMAGE INPUT
Signature:
 

    init(name,label_text,callback,return_react,event)

Example:
   

    attributes: {
                dummy:{type:"string"},
                background:{type:"string"}
    },
    ...
     edit: function(props) 
        {
            return new ImageInput(props).init("background");
            /* OR */
            
            var image = new ImageInput(props);
            return image.init("background");
        }

 
@name - "text" - name of variable to store the input value
<br>@label_text - "text:" - text that will be displayed above the input
<br>@callback(optional) - function - function that will be executed after image selected, used in Gallery object mostly. Argument to callback is @url - url of selected image.
<br>@return_react(optional) - boolean - defines if we should return reactjs object(html) or just show the media select popup
<br>@event(optional) - event - event passed if we need to show the media modal popup (events like: click, change, etc), so for example it's used if this method is called on click and we need to get the media modal popup.
Example with event & callback:

    /* add_image is called on click */
    add_image(event)
    {
        ...
        var img = new ImageInput(this.props);
        ...
        var callback = function(url)
        {
            ...
        }
        img.init("","",callback,false,event);
    }

Returns VOID | REACTJS  object with all needed stuff for image input. So, user only needs to select any image | opens modal window
<br>
![
](https://i.imgur.com/imruomt.png)
# Usage: COLOR INPUT
Signature:
 

    init(name,label_text)

Example:
   

    attributes: {
                dummy:{type:"string"},
                bg_color:{type:"string"}
    },
    ...
    edit: function(props) 
        {
            return new ColorInput(props).init("bg_color", "Select color:");
            /* OR */
            
            var color = new ColorInput(props);
            return color.init("bg_color", "Select color:");
        }

 
@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input

Alpha is supported :)

Returns REACTJS object with all needed stuff for color input. So, user only needs to pick a right color. 
![
](https://i.imgur.com/lM69bRW.png)
# Usage: CHECKBOX INPUT
Signature:
 

    init(name,label_text)

Example:
   

    attributes: {
                dummy:{type:"string"},
                checkbox_test:{type:"boolean"}
    },
    ...
    edit: function(props) 
        {
            return new CheckBoxInput(props).init("checkbox_test","Check me!");
            /* OR */
            
            var checkbox = new CheckBoxInput(props);
            return checkbox.init("checkbox_test","Check me!");
        }

 
@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input


Returns REACTJS object with all needed stuff for checkbox input. So, user only needs to check or uncheck it. 
![
](https://i.imgur.com/wZIbABz.png)
# Usage: RADIOGROUP INPUT
Signature:
 

    init(name,label_text,values)

Example:
   

    attributes: {
                dummy:{type:"string"},
                radio_text:{type:"string"}
    },
    ...
    /* Declare array of objects with values and labels before the 'edit' callback */
    const buttons = [
                 {
                    val:"test1",
                    label:"TEST 1"
                 },
                 {
                    val:"test2",
                    label:"TEST 2"
                 },
                 {
                    val:"test3",
                    label:"TEST 3"
                 }
            ];
    edit: function(props) 
        {
            return new RadioGroupInput(props).init("radio_text","Select 1 of them:",buttons)
            /* OR */
            
            var radiogroup = new RadioGroupInput(props);
            return radiogroup.init("radio_text","Select 1 of them:",buttons);
        }

 Saved as string - property 'val' of button object.
@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input
<br>
@values - array of objects with properties: "val" - value that will be stored when this radio button is checked and "label" - text that will be displayed next to radio button.

Returns REACTJS object with all needed stuff for radiogroup input. So, user only needs to select right button.
![
](https://i.imgur.com/xUSJEua.png)
# Usage: FONTSIZEPICKER TOOL
Signature:
 

    init(name,label_text)

Example:
   

    attributes: {
                dummy:{type:"string"},
                text_fs:{type:"string"}
    },
    ... 
    edit: function(props) 
        {
            return new FontSizePickerTool(props).init("text_fs")
            /* OR */
            
            var fs_input = new FontSizePickerTool(props);
            return fs_input.init("text_fs");
        }

 Saved as string - with 'px' at the end.
@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input

Default font-sizes can be overriden:

    var fsPicker = new FontSizePickerInput(props);
    fsPicker.sizes = function()
    {
        const sizes = [
            {
                name: '8px' ,
                slug: '8px',
                size: 8,
            },
            {
                name: '10px' ,
                slug: '10px',
                size: 10,
            },
        ];
        return sizes;
    }
Default callback could also be overriden.

Returns REACTJS object with all needed stuff for fontsize input. So, user only needs to select right size of font.
![
](https://i.imgur.com/NhOiL8s.png)
# Usage: ALIGNMENT TOOL
Signature:
 

    init(name,label_text)

Example:
   

    attributes: {
                dummy:{type:"string"},
                text_align:{type:"string"}
    },
    ... 
    edit: function(props) 
        {
            return new AlignmentTool(props).init("text_align")
            /* OR */
            
            var aligntool = new AlignmentTool(props);
            return aligntool.init("text_align");
        }

@name - "text" - name of variable to store the input value
<br>@label_text(optional, may be ' ') - "text:" - text that will be displayed above the input

Returns REACTJS object with all needed stuff for text align input. So, user only needs to select right side of text.
![
](https://i.imgur.com/ZV4DyOo.png)

# Usage: INPUT: Common to all
1 [additional onChange callback] - Here is how we can pass the callback that accepts properties object and input value object as arguments. Executed before original value is saved, so we can modify original value. Should be defined before object init().
 
       var textbox = new Text(props);
       text.callback = (props,object) =>
       {
           // code goes here
       }
       ...
2 [custom style] - You can override basic style of each input by overriding its "style" method:  

    var textbox = new TextInput(props);
    textbox.style = () =>
    {
        return {
             color:"red",
             background:"black"
          }
    }
Here is how we can set new style of element and keep basic style:

     var current_style = custom_textbox.style();
     custom_textbox.style = () =>
     {
          return Object.assign({
                  color:"red",
                  çbackground:"black"
          },current_style);
    }

# Usage: GALLERY
Signature:
 

    this.gallery = new Gallery(_props);
    init(object_sample,_variable_name)

Example:
   

   

    attributes: {
                dummy:{type:"string"},
                imagesssss:{type:"array"}
    },
    ...
    edit: function(props) 
        {
            return new Gallery(props).init(object_sample,"imagesssss");
            
            /* OR */
            var gallery = new Gallery(props);
            gallery.init(object_sample,"imagesssss");
        }

    

@object_sample - object - a sample of object that should be used within gallery 
<br>@_variable_name - "text" - name of variable to store the images array

Object example:

        var object_sample = {
                    id:
                    {
                        val:"",
                        caption:"ID"
                    },
                    url:
                    {
                        val:"",
                        caption:"URL"
                    },
                    heading:
                    {
                        val:"",
                        caption:"Heading"
                    }
                }
Fields like: ***id*** and ***url*** are ***REQUIRED***, the rest are optional, developer can specify any field he needs, but the structure `property:{val:"",caption:""}` has to be saved.
For each custom property user will receive prompt window asking to fill the value when the image is selected:![
](https://i.imgur.com/0w0ImQJ.png)
Returns REACTJS object with all needed stuff for gallery input. So, user only needs to select images 1 by 1 and fill needed fields like heading, sub-line, / whatever specified in the code. 

User will have an ability to move image up/down inside of array, edit all custom properties(actually, any properties different from "url" and "id"), to delete image.
<br>
![
](https://camo.githubusercontent.com/f6c04e220ebc99dd8bf1b64dc6e4c015f7ac4d67/68747470733a2f2f692e696d6775722e636f6d2f393062614a31652e706e67)
# Usage: LINKS
Signature:
 

    this.link = new Link(_props);
    init(_variable_name)

Example:
   
    attributes: {
                dummy:{type:"string"}
                linkssssss:{type:"array"}
    },
    ...
    edit: function(props) 
        {
            return new Link(props).init("linkssssss");
            
            /* OR */
            var links = new Link(props);
            links.init("linkssssss");
        }

 
@_variable_name - "text" - name of variable to store the links array


Returns REACTJS object with all needed stuff for links input. So, user only needs to enter link ***url*** and ***name***.
Links are filled using prompt popup asking for URL and NAME 1 by 1.
User has an ability to edit the url & name of link and may delete link as well.<br>
![
](https://i.imgur.com/agenRbe.png)
# Usage: LIST
Signature:
 

    this.list = new List(_props);
    init(object_sample,_variable_name)

Example:
   

   

    attributes: {
                dummy:{type:"string"},
                list_var:{type:"array"}
    },
    ...
    edit: function(props) 
        {
            return new List(props).init("list_var",object_sample);
            
            /* OR */
            var list = new List(props);
            list.init("list_var",object_sample);
        }

    

@object_sample - object - a sample of object that should be used within list 
<br>@_variable_name - "text" - name of variable to store the array

Object example:

         var list_object_sample = {
                id:
                {
                    val:"",
                    caption:"ID"
                },
                slug:
                {
                    val:"",
                    caption:"Game Slug"
                },
                kek:
                {
                    val:"",
                    caption:"KEK"
                }
            }
Field: ***id*** ist ***REQUIRED***, the rest are optional, developer can specify any field he needs, but the structure `property:{val:"",caption:""}` has to be saved.
For each custom property user will receive prompt window asking to fill the value
![
](https://i.imgur.com/0w0ImQJ.png)
Returns REACTJS object with all needed stuff for simple generic list input. 

User will have an ability to edit and delete the items on the list.
<br>
![
](https://i.imgur.com/RFoTkhG.png)

