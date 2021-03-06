class ImageInput extends BaseInput
{
    constructor(_props)
    {
        super(_props);
    }
    // override basic style for img
    style()
    {
      return {
         width:"100%",
         background:'silver'
      }
    }
    /*  
        Generates image id / can be overriden
    */
    generate_id()
    {
        var id = 'image_' + Math.random().toString(36).substr(2, 9);
        if( jQuery( "#" + id ).length > 0 )
        {
            return this.generate_id();
        }
        return id;
    }
    /*
        Override 'current' value if it's passed not from block properties

        @returns STRING (URL)
    */
    current_src()
    {
        return this.props.attributes[this.my_name];
    }
    /*
        Defines if we render 'remove image' button
    */
    render_remove_btn()
    {
        return true;
    }
    /*
     *
     * Generates wp media modal window
     *
     * @return WP.MEDIA object
     *
     */
    generate_wp_media_modal()
    {
        return wp.media.frames.customHeader = wp.media({
            //Title of media manager frame
            title: "Select image",
            library: {
               type: 'image'
            },
            button: {
               //Button text
               text: "Insert image"
            },
            //Do not allow multiple files
            multiple: false
          });
    }
    /*
     *
     * Generates all needed stuff for simple image input, including image preview, 'add image' button
     *
     * @name - STRING - name of attribute that will be associated with input value
     *
     * @label_text - STRING - text that will be displayed on the label under input
     *
     * @callback - FUNCTION - simple callback that will be executed when image is selected(can be object property setup process?)
     *
     * @return_react - BOOLEAN - if function should return reactjs object or execute handle callback(stored in function)
     *
     * @event - EVENT - event that has been triggered(click,change,etc), default undefined
     *
     * @return reactjs object | VOID
     *
     */
    init(name,label_text,callback,return_react,event)
    {
        this.my_name = name;
        if( typeof return_react === 'undefined' )
        {
            return_react = true;
        }
        if( typeof label_text === 'undefined' )
        {
            label_text = '';
        }
        if( typeof name === 'undefined' || name === null ) 
        {
            console.error("Unable to init image input because variable @name is undefined!");
            return null;
        }
        var me = this;
        me.id = this.generate_id();
        var handle_image_change = function (event) 
        {
            me.current_object_container = jQuery(event.target);
            // Create WP media frame.
            var custom_file_frame = me.generate_wp_media_modal();
            // bind select event so we can pick the object of selected attachment and get its url
            custom_file_frame.on('select', function() 
            {
              var attachment = custom_file_frame.state().get('selection').first().toJSON();
              if (me.current_object_container != undefined) 
              {
                // get parent container (from clicked button) so we can access its children
                var obj = jQuery(me.current_object_container).parent();
                // set image src
                obj.children("img").attr("src", attachment.url);
                if(callback != undefined)
                {
                    // execute callback
                    callback(attachment.url);
                }
                else
                {
                    me.update_attr(me,attachment.url);
                }
              }

            });
            // open wordpress media modal window
            custom_file_frame.open();
        };
        if(return_react)
        {
            // method that spawns 'remove image' btn if image is set
            var spawn_del_btn = function() 
            {
                if(me.props.attributes[me.my_name] != undefined)
                {
                    return me.el('button',{className:"custom-block-button components-button editor-post-preview is-button is-default is-large",
                        onClick:function(event)
                        {
                            var conf = confirm(img_translations.confirm_deletion);
                            if(conf)
                            {
                                me.props.attributes[me.my_name] = undefined;
                                jQuery(event.target).parent().children("div").children("img").removeAttr("src");
                                Common.set_dummy(me.props);
                            }
                        }
                    },img_translations.remove_image);
                }
            }
            return this.el('div',{},
                    [
                        this.el('label',{},label_text),
                        this.el('div',{style:{width:"100%"},className:"image-input-block-element"},
                        [
                             this.el('img',{style:this.style(),
                                src:this.current_src(),
                                id:this.id
                            })
                        ]),
                        this.el('button',{
                            className:"custom-block-button components-button editor-post-preview is-button is-default is-large",
                            onClick:handle_image_change, 
                            name:name+"-selector-btn"
                        },img_translations.add_image),
                        /* REMOVE IMAGE BUTTON */
                        (()=>{
                            if(this.render_remove_btn())
                            {
                                return spawn_del_btn()
                            }
                        })()
                    ])
        }
        else
        {
            if(event != undefined)
            {
                handle_image_change(event);
            }
        }
    }
}