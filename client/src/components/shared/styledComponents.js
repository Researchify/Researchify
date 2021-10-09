import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
// export const PrimaryButton = styled.button` // Bootstrap Blue
//     border: 1px solid transparent;
//     padding: .375rem .75rem;
//     border-radius: .25rem;
//     border-color: #007bff;
//     background-color: #007bff;
//     color: white;
//     transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//     font-size: ${(props) => props.fontSize}; //.875rem;
//   &:hover{
//     background-color: #0069d9;
//   }
// `;

export const PrimaryButton = styled.button` // Purple
    padding: .375rem .75rem;
    border: 1px solid #56658a;
    border-radius: .25rem;
    background-color: #56658a;
    color: white;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: ${(props) => props.fontSize}; //.875rem;
  &:hover{
    background-color:rgb(60, 70, 96);
  }
`;

// export const SecondaryButton = styled.button` // Outline-Gold
//     padding: .375rem .75rem;
//     border: 1px solid #AB9671;
//     border-radius: .25rem;
//     background-color: inherit;
//     color: #AB9671;
//     transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//     font-size: ${(props) => props.fontSize}; //.875rem;
//   &:hover{
//     background-color:rgb(119, 105, 79);
//     color: white;
//   }
// `;

// export const PrimaryButton = styled.button` // Gold
//     padding: .375rem .75rem;
//     border: 1px solid #AB9671;
//     border-radius: .25rem;
//     background-color: #AB9671;
//     color: white;
//     transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//     font-size: ${(props) => props.fontSize}; //.875rem;
//   &:hover{
//     background-color: rgb(119, 105, 79);
//   }
// `;

export const SecondaryButton = styled.button` // Outline-Purple
    padding: .375rem .75rem;
    border: 1px solid #56658a;
    border-radius: .25rem;
    background-color: transparent;
    color: #56658a;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: ${(props) => props.fontSize}; //.875rem;
  &:hover{
    background-color:rgb(60, 70, 96);
    color: white;
  }
`;

export const DangerButton = styled.button`
    padding: .375rem .75rem;
    border-radius: .25rem;
    border: 1px solid #dc3545;
    background-color: inherit;
    color: #dc3545;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover{
    background-color: #dc3545;
    color: white;
  }
  &:disabled{
    pointer-events: none;
    opacity: .65;
  }
`;

export const OptionEditButton = styled.button` // Blue with a darker blue background when hovering
    padding: .375rem .75rem;
    border: 1px solid rgb(60, 70, 96);
    border-radius: .25rem;
    background-color: rgb(88, 102, 138);
    color: white;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: ${(props) => props.fontSize}; //.875rem;
  &:hover{
    background-color: rgb(60, 70, 96);
    color: white;
  }
`;

export const RedDeleteButton = styled.button` // Red with darker red background when hovering
    padding: .375rem .75rem;
    border: 1px solid #9e2833;
    border-radius: .25rem;
    background-color: #dc3545;
    color: white;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: ${(props) => props.fontSize}; //.875rem;
  &:hover{
    background-color: #9e2833;
  }
`;
