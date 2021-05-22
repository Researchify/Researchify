/**
 * The PublicationBadge component is a reusable badge used to associate additional attributes to a Publication.
 */
import React from 'react';
import Badge from 'react-bootstrap/Badge';

const PublicationBadge = () => {
    return (
        <>
            <Badge pill variant="primary">Awards: 50</Badge>
        </>
    );
};

export default PublicationBadge;
