import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 50px 70px 30px 70px;
  gap: 10px;
`;

const FormHeader = styled.h5`
  font-family: "FiraGO", sans-serif;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 30px;
  align-self: center;
`;

const FormFieldRow = styled.div`
  display: flex;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  input {
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
`;

const Label = styled.label`
  font-family: "FiraGO", sans-serif;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ErrorText = styled.p`
  color: red;
`;

const AvatarTextArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100px;
  align-items: center;
  border: 2px dashed #ccc;
  cursor: pointer;
`;

const PlusIcon = styled.span`
  font-size: 50px;
  color: #ccc;
`;

const AvatarPreview = styled.img`
  width: 100%;
  height: 100%;
`;

const DeleteIcon = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;
`;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("აუცილებელია")
    .matches(/^[A-Za-z\u10A0-\u10FF]+$/, "სახელი უნდა შეიცავდეს მხოლოდ ასოებს")
    .min(2, "მინიმუმ 2 სიმბოლო"),
  surname: yup
    .string()
    .required("აუცილებელია")
    .matches(/^[A-Za-z\u10A0-\u10FF]+$/, "გვარი უნდა შეიცავდეს მხოლოდ ასოებს")
    .min(2, "მინიმუმ 2 სიმბოლო"),
  email: yup
    .string()
    .required("აუცილებელია")
    .email("ელ-ფოსტის არასწორი ფორმატი")
    .matches(/@redberry\.ge$/, "გამოიყენეთ @redberry.ge ფოსტა"),
  phone: yup
    .string()
    .required("აუცილებელია")
    .matches(/^5\d{8}$/, "ფორმატი უნდა იყოს 5XXXXXXXXX"),
  avatar: yup.mixed().required(),
});

const AddAgentForm = ({ handleClose }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchAllFields = watch();

  useEffect(() => {
    const savedFormData = localStorage.getItem("addAgentFormData");
    const savedErrors = localStorage.getItem("addAgentFormErrors");

    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }

    if (savedErrors) {
      const parsedErrors = JSON.parse(savedErrors);
      Object.keys(parsedErrors).forEach((field) => {
        setError(field, {
          type: "manual",
          message: parsedErrors[field],
        });
      });
    }
  }, [setValue, setError]);

  useEffect(() => {
    localStorage.setItem("addAgentFormData", JSON.stringify(watchAllFields));

    if (errors) {
      const errorMessages = {};
      Object.keys(errors).forEach((field) => {
        errorMessages[field] = errors[field]?.message;
      });
      localStorage.setItem("addAgentFormErrors", JSON.stringify(errorMessages));
    }
  }, [watchAllFields, errors]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatar", file);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarPreview(null);
    setValue("avatar", null);
  };

  const handleFormReset = () => {
    reset();
    setAvatarPreview(null);
    localStorage.removeItem("addAgentFormData");
    localStorage.removeItem("addAgentFormErrors");
    handleClose();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar);

    try {
      const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";

      await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("აგენტი წარმატებით დაემატა");
      handleFormReset();
      handleClose();
    } catch (error) {
      setSubmissionMessage("შეცდომა აგენტის დამატებისას");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>აგენტის დამატება</FormHeader>
      {submissionMessage && <p>{submissionMessage}</p>}

      <FormFieldRow>
        <FormField>
          <Label>სახელი *</Label>
          <input type="text" {...register("name")} />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </FormField>

        <FormField>
          <Label>გვარი *</Label>
          <input type="text" {...register("surname")} />
          {errors.surname && <ErrorText>{errors.surname.message}</ErrorText>}
        </FormField>
      </FormFieldRow>

      <FormFieldRow>
        <FormField>
          <Label>ელ-ფოსტა *</Label>
          <input type="email" {...register("email")} />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </FormField>

        <FormField>
          <Label>ტელეფონის ნომერი *</Label>
          <input type="tel" {...register("phone")} />
          {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
        </FormField>
      </FormFieldRow>

      <label>ატვირთეთ ფოტო *</label>
      <AvatarTextArea onClick={() => document.getElementById("avatar").click()}>
        {!avatarPreview && <PlusIcon>+</PlusIcon>}
        {avatarPreview && (
          <div>
            <AvatarPreview src={avatarPreview} />
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAvatar();
              }}
            >
              🗑️
            </DeleteIcon>
          </div>
        )}
      </AvatarTextArea>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        {...register("avatar")}
        onChange={handleAvatarChange}
      />
      {errors.avatar && <ErrorText>{errors.avatar.message}</ErrorText>}

      <ButtonsContainer>
        <StyledButton
          type="button"
          $variant="secondary"
          style={{ width: "105px", height: "50px" }}
          onClick={handleFormReset}
        >
          გაუქმება
        </StyledButton>
        <StyledButton
          $variant="primary"
          style={{ width: "105px", height: "50px" }}
        >
          დაამატე აგენტი
        </StyledButton>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default AddAgentForm;
