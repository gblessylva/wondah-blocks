import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ColorPicker, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('wondah-blocks/columns-block', {
    title: __('Columns Block', 'wondah-blocks'),
    icon: 'columns',
    category: 'design',
    attributes: {
        columns: {
            type: 'number',
            default: 2
        },
        gap: {
            type: 'number',
            default: 30
        },
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
         backgroundImage: {
            type: 'string',
            default: ''
        },
        backgroundImageId: {
            type: 'number'
        },
        backgroundOverlay: {
            type: 'string',
            default: 'rgba(0,0,0,0)'
        },
        padding: {
            type: 'number',
            default: 40
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                <PanelBody title={__('Background Image', 'wondah-blocks')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        backgroundImage: media.url,
                                        backgroundImageId: media.id
                                    });
                                }}
                                allowedTypes={['image']}
                                value={attributes.backgroundImageId}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        variant="secondary"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    >
                                        {attributes.backgroundImage ? __('Replace Background Image', 'wondah-blocks') : __('Add Background Image', 'wondah-blocks')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        {attributes.backgroundImage && (
                            <>
                                <Button
                                    onClick={() => setAttributes({ backgroundImage: '', backgroundImageId: null })}
                                    variant="link"
                                    isDestructive
                                >
                                    {__('Remove Background Image', 'wondah-blocks')}
                                </Button>
                                <div className="color-settings" style={{ marginTop: '16px' }}>
                                    <label>{__('Overlay Color', 'wondah-blocks')}</label>
                                    <ColorPicker
                                        color={attributes.backgroundOverlay}
                                        onChangeComplete={(color) => setAttributes({ 
                                            backgroundOverlay: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})` 
                                        })}
                                    />
                                </div>
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title={__('Column Settings', 'wondah-blocks')}>
                        <RangeControl
                            label={__('Number of Columns', 'wondah-blocks')}
                            value={attributes.columns}
                            onChange={(columns) => setAttributes({ columns })}
                            min={1}
                            max={4}
                        />
                        <RangeControl
                            label={__('Gap Between Columns (px)', 'wondah-blocks')}
                            value={attributes.gap}
                            onChange={(gap) => setAttributes({ gap })}
                            min={0}
                            max={100}
                        />
                        <RangeControl
                            label={__('Padding (px)', 'wondah-blocks')}
                            value={attributes.padding}
                            onChange={(padding) => setAttributes({ padding })}
                            min={0}
                            max={100}
                        />
                        <div className="color-settings">
                            <label>{__('Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.backgroundColor}
                                onChangeComplete={(color) => setAttributes({ backgroundColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div 
                    {...blockProps} 
                    className="wondah-columns-block"
                    style={{
                        backgroundColor: attributes.backgroundColor,
                        padding: `${attributes.padding}px`,
                        backgroundImage: attributes.backgroundImage ? `url(${attributes.backgroundImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }}
                >
                    {attributes.backgroundImage && (
                        <div 
                            className="background-overlay"
                            style={{
                                backgroundColor: attributes.backgroundOverlay,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}
                        />
                    )}
                    <div 
                        className="columns-container"
                        style={{
                            gridTemplateColumns: `repeat(${attributes.columns}, 1fr)`,
                            gap: `${attributes.gap}px`,
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {[...Array(attributes.columns)].map((_, index) => (
                            <div key={index} className="column">
                                <InnerBlocks
                                    allowedBlocks={['core/paragraph', 'core/heading', 'core/image', 'core/button']}
                                    template={[
                                        ['core/paragraph', { placeholder: 'Add content...' }]
                                    ]}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();

        return (
            <div 
                {...blockProps} 
                className="wondah-columns-block"
                style={{
                    backgroundColor: attributes.backgroundColor,
                    padding: `${attributes.padding}px`
                }}
            >
                <div 
                        className="columns-container"
                        style={{
                            gridTemplateColumns: `repeat(${attributes.columns}, 1fr)`,
                            gap: `${attributes.gap}px`,
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {[...Array(attributes.columns)].map((_, index) => (
                            <div key={index} className="column">
                                <InnerBlocks.Content />
                            </div>
                        ))}
                    </div>
            </div>
        );
    }
});