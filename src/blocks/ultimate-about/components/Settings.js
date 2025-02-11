import { PanelBody, ColorPicker, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const Settings = ({ attributes, setAttributes }) => {
    const {
        subtitleColor, titleColor, highlightedTitleColor, descriptionColor,
        subtitleFontSize, titleFontSize, descriptionFontSize
    } = attributes;

    return (
        <PanelBody title={__('Typography Settings', 'wondah-blocks')}>
            <div className="color-settings">
                <label>{__('Subtitle Color', 'wondah-blocks')}</label>
                <ColorPicker
                    color={subtitleColor}
                    onChangeComplete={(color) => setAttributes({ subtitleColor: color.hex })}
                />
            </div>
            <div className="color-settings">
                <label>{__('Title Color', 'wondah-blocks')}</label>
                <ColorPicker
                    color={titleColor}
                    onChangeComplete={(color) => setAttributes({ titleColor: color.hex })}
                />
            </div>
            <div className="color-settings">
                <label>{__('Highlighted Title Color', 'wondah-blocks')}</label>
                <ColorPicker
                    color={highlightedTitleColor}
                    onChangeComplete={(color) => setAttributes({ highlightedTitleColor: color.hex })}
                />
            </div>
            <div className="color-settings">
                <label>{__('Description Color', 'wondah-blocks')}</label>
                <ColorPicker
                    color={descriptionColor}
                    onChangeComplete={(color) => setAttributes({ descriptionColor: color.hex })}
                />
            </div>
            <RangeControl
                label={__('Subtitle Font Size', 'wondah-blocks')}
                value={subtitleFontSize}
                onChange={(size) => setAttributes({ subtitleFontSize: size })}
                min={12}
                max={32}
            />
            <RangeControl
                label={__('Title Font Size', 'wondah-blocks')}
                value={titleFontSize}
                onChange={(size) => setAttributes({ titleFontSize: size })}
                min={24}
                max={72}
            />
            <RangeControl
                label={__('Description Font Size', 'wondah-blocks')}
                value={descriptionFontSize}
                onChange={(size) => setAttributes({ descriptionFontSize: size })}
                min={14}
                max={24}
            />
        </PanelBody>
    );
};