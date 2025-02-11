import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const TeamSection = ({ attributes, setAttributes }) => {
    const {
        teamSectionTitle,
        teamExperience,
        teamDescription,
        teamMembers,
        teamExperienceSuffix,
    } = attributes;

    const updateTeamMember = (index, updates) => {
        const newTeamMembers = [...teamMembers];
        newTeamMembers[index] = { ...newTeamMembers[index], ...updates };
        setAttributes({ teamMembers: newTeamMembers });
    };

    return (
        <div className="team-section">
            <div className="team-header">
                <div className="team-title-wrapper">
                    <RichText
                        tagName="h2"
                        className="team-title"
                        value={teamSectionTitle}
                        onChange={(teamSectionTitle) => setAttributes({ teamSectionTitle })}
                        placeholder={__('Our team has over', 'wondah-blocks')}
                    />
                    <RichText
                        tagName="span"
                        className="team-experience"
                        value={teamExperience}
                        onChange={(teamExperience) => setAttributes({ teamExperience })}
                        placeholder={__('100 years', 'wondah-blocks')}
                    />
                    <RichText
                        tagName="span"
                        className="team-experience-suffix"
                        value={teamExperienceSuffix}
                        onChange={(teamExperienceSuffix) => setAttributes({ teamExperienceSuffix })}
                        placeholder={__('of combined experience!', 'wondah-blocks')}
                    />
                </div>
                <RichText
                    tagName="p"
                    className="team-description"
                    value={teamDescription}
                    onChange={(teamDescription) => setAttributes({ teamDescription })}
                    placeholder={__('Enter team description...', 'wondah-blocks')}
                />
            </div>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <div className="member-card">
                            <div className="member-image-wrapper">
                                <MediaUpload
                                    onSelect={(media) => updateTeamMember(index, { image: media })}
                                    allowedTypes={['image']}
                                    value={member.image?.id}
                                    render={({ open }) => (
                                        member.image?.url ? (
                                            <div className="image-wrapper">
                                                <img src={member.image.url} alt={member.name} />
                                                <div className="image-overlay">
                                                    <Button
                                                        onClick={open}
                                                        className="change-image"
                                                        variant="secondary"
                                                    >
                                                        {__('Change Image', 'wondah-blocks')}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button
                                                onClick={open}
                                                className="upload-button"
                                                variant="primary"
                                            >
                                                {__('Upload Image', 'wondah-blocks')}
                                            </Button>
                                        )
                                    )}
                                />
                            </div>
                            <div className="member-info">
                                <RichText
                                    tagName="h3"
                                    className="member-name"
                                    value={member.name}
                                    onChange={(name) => updateTeamMember(index, { name })}
                                    placeholder={__('Team Member Name', 'wondah-blocks')}
                                />
                                <RichText
                                    tagName="p"
                                    className="member-position"
                                    value={member.position}
                                    onChange={(position) => updateTeamMember(index, { position })}
                                    placeholder={__('Position', 'wondah-blocks')}
                                />
                                <RichText
                                    tagName="p"
                                    className="member-bio"
                                    value={member.bio}
                                    onChange={(bio) => updateTeamMember(index, { bio })}
                                    placeholder={__('Member bio...', 'wondah-blocks')}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SaveTeamSection = ({ attributes }) => {
    const {
        teamSectionTitle,
        teamExperience,
        teamDescription,
        teamMembers,
        teamExperienceSuffix
    } = attributes;

    return (
        <div className="team-section">
            <div className="team-header">
                <div className="team-title-wrapper">
                    <RichText.Content
                        tagName="h2"
                        className="team-title"
                        value={teamSectionTitle}
                    />
                    <RichText.Content
                        tagName="span"
                        className="team-experience"
                        value={teamExperience}
                    />
                    <RichText.Content
                        tagName="span"
                        className="team-experience-suffix"
                        value={teamExperienceSuffix}
                    />
                </div>
                <RichText.Content
                    tagName="p"
                    className="team-description"
                    value={teamDescription}
                />
            </div>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <div className="member-card">
                            <div className="member-image-wrapper">
                                {member.image?.url && (
                                    <div className="image-wrapper">
                                        <img src={member.image.url} alt={member.name} />
                                    </div>
                                )}
                            </div>
                            <div className="member-info">
                                <RichText.Content
                                    tagName="h3"
                                    className="member-name"
                                    value={member.name}
                                />
                                <RichText.Content
                                    tagName="p"
                                    className="member-position"
                                    value={member.position}
                                />
                                <RichText.Content
                                    tagName="p"
                                    className="member-bio"
                                    value={member.bio}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};