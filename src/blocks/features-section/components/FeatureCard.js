import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import IconPicker from './IconPicker';

const FeatureCard = ({ feature, index, onChange, onRemove, isEdit = true, iconSize }) => {
    if (isEdit) {
        return (
            <div className="feature-item">
                {onRemove && (
                    <Button
                        className="remove-feature"
                        onClick={() => onRemove(index)}
                        isDestructive
                        variant="secondary"
                    >
                        {__('Remove', 'wondah-blocks')}
                    </Button>
                )}
                <IconPicker
                    currentIcon={feature.icon}
                    iconSize={iconSize}
                    onSelect={(newIcon) => onChange(index, { ...feature, icon: newIcon })}
                />
                <RichText
                    tagName="h3"
                    value={feature.title}
                    onChange={(title) => onChange(index, { ...feature, title })}
                    className="feature-title"
                />
                <RichText
                    tagName="p"
                    value={feature.description}
                    onChange={(description) => onChange(index, { ...feature, description })}
                    className="feature-description"
                />
            </div>
        );
    }

    return (
        <div className="feature-item">
            <div 
                className="icon" 
                dangerouslySetInnerHTML={{ 
                    __html: feature.icon.replace(/width="([^"]+)"/, `width="${iconSize}"`).replace(/height="([^"]+)"/, `height="${iconSize}"`) 
                }} 
            />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
        </div>
    );
};

export default FeatureCard;