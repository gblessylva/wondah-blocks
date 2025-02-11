import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const SocialProof = ({ attributes, setAttributes }) => {
    const { socialProofItems = [] } = attributes;

    return (
        <div className="social-proof">
            <div className="social-proof-grid">
                {socialProofItems.map((item, index) => (
                    <div key={index} className="social-proof-item">
                        <div className="icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                        <RichText
                            tagName="h3"
                            value={item.title}
                            onChange={(title) => {
                                const newItems = [...socialProofItems];
                                newItems[index] = { ...item, title };
                                setAttributes({ socialProofItems: newItems });
                            }}
                            placeholder={__('Feature Title', 'wondah-blocks')}
                            className="social-proof-title"
                        />
                        <RichText
                            tagName="p"
                            value={item.description}
                            onChange={(description) => {
                                const newItems = [...socialProofItems];
                                newItems[index] = { ...item, description };
                                setAttributes({ socialProofItems: newItems });
                            }}
                            placeholder={__('Feature description', 'wondah-blocks')}
                            className="social-proof-description"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SaveContent = ({ attributes }) => {
    const { socialProofItems = [] } = attributes;

    return (
        <div className="social-proof">
            <div className="social-proof-grid">
                {socialProofItems.map((item, index) => (
                    <div key={index} className="social-proof-item">
                        <div className="icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                        <RichText.Content
                            tagName="h3"
                            value={item.title}
                            className="social-proof-title"
                        />
                        <RichText.Content
                            tagName="p"
                            value={item.description}
                            className="social-proof-description"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialProof;