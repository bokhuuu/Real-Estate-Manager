import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1596px;
  width: 100%;
  height: auto;
  margin: 20px auto;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 790px;
  gap: 8px;
`;

const FormHeader = styled.h5`
  font-family: "FiraGO", sans-serif;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 20px;
  align-self: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;

  select {
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
`;

const HalfWidthField = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  margin-bottom: 10px;

  input,
  select {
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
`;

const FullWidthField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
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
  align-items: center;
  width: 100%;
  height: 100px;
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

const RadioButtonGroup = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 15px;
  gap: 20px;
`;

const schema = yup.object().shape({
  saleRent: yup.string().required("აუცილებელია აირჩიოთ იყიდება ან ქირავდება"),
  address: yup.string().required("აუცილებელია").min(2, "მინიმუმ 2 სიმბოლო"),
  zipCode: yup
    .string()
    .required("აუცილებელია")
    .matches(/^\d+$/, "დასაშვებია მხოლოდ მთელი რიცხვები"),
  price: yup
    .string()
    .required("აუცილებელია")
    .matches(/^\d+$/, "მხოლოდ რიცხვები"),
  area: yup
    .string()
    .required("აუცილებელია")
    .matches(/^\d+(\.\d+)?$/, "მხოლოდ რიცხვები"),
  bedrooms: yup
    .string()
    .required("აუცილებელია")
    .matches(/^\d+$/, "დასაშვებია მხოლოდ მთელი რიცხვები"),
  description: yup
    .string()
    .required("აუცილებელია")
    .test("minWords", "მინიმუმ 5 სიტყვა", (value) => {
      return (
        value &&
        value
          .trim()
          .split(/\s+|,+/)
          .filter(Boolean).length >= 5
      );
    }),
  avatar: yup.mixed().required(),
  agent: yup.string().required("აუცილებელია აირჩიოთ აგენტი"),
});

const AddListingForm = () => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [agents, setAgents] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchAllFields = watch();
  const selectedRegion = watch("region");

  useEffect(() => {
    const savedFormData = localStorage.getItem("addListingFormData");
    const savedErrors = localStorage.getItem("addListingFormErrors");

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
    localStorage.setItem("addListingFormData", JSON.stringify(watchAllFields));

    if (errors) {
      const errorMessages = {};
      Object.keys(errors).forEach((field) => {
        errorMessages[field] = errors[field]?.message;
      });
      localStorage.setItem(
        "addListingFormErrors",
        JSON.stringify(errorMessages)
      );
    }
  }, [watchAllFields, errors]);

  useEffect(() => {
    const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";

    axios
      .get(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => setRegions(response.data))
      .catch((error) => console.error("Error fetching regions:", error));

    axios
      .get("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAgents(response.data))
      .catch((error) => console.error("Error fetching agents:", error));

    axios
      .get("https://api.real-estate-manager.redberryinternship.ge/api/cities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setCities(response.data));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = cities.filter(
        (city) => city.region_id === Number(selectedRegion)
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedRegion, cities]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 1048576) {
        setAvatarPreview(URL.createObjectURL(file));
        setValue("avatar", file);
      } else {
        setErrorMessage("ფაილის ზომა უნდა იყოს 1MB-ზე ნაკლები");
      }
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarPreview(null);
    setValue("avatar", null);
  };

  const handleFormReset = () => {
    reset();
    setAvatarPreview(null);
    setErrorMessage("");
    localStorage.removeItem("addListingFormData");
    localStorage.removeItem("addListingFormErrors");
    navigate("/");
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("zip_code", data.zipCode);
    formData.append("price", data.price);
    formData.append("area", data.area);
    formData.append("bedrooms", data.bedrooms);
    formData.append("description", data.description);
    formData.append("is_rental", data.saleRent === "rent" ? "0" : "1");
    formData.append("region_id", data.region);
    formData.append("city_id", data.city);
    formData.append("agent_id", data.agent);
    formData.append("image", data.avatar);

    try {
      const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";

      await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      reset();
      setAvatarPreview(null);
      localStorage.removeItem("addListingFormData");
      localStorage.removeItem("addListingFormErrors");
      alert("ქონება წარმატებით დაემატა");
      navigate("/");
    } catch (error) {
      alert("შეცდომა ქონების დამატებისას");
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>ლისტინგის დამატება</FormHeader>

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <FullWidthField>
          <h4>ᲒᲐᲠᲘᲒᲔᲑᲘᲡ ᲢᲘᲞᲘ</h4>
          <RadioButtonGroup>
            <input type="radio" value="sale" {...register("saleRent")} />{" "}
            იყიდება
            <input type="radio" value="rent" {...register("saleRent")} />{" "}
            ქირავდება
          </RadioButtonGroup>
          {errors.saleRent && <ErrorText>{errors.saleRent.message}</ErrorText>}
        </FullWidthField>

        <h4>ᲛᲓᲔᲑᲐᲠᲔᲝᲑᲐ</h4>
        <InputGroup>
          <HalfWidthField>
            <Label>მისამართი *</Label>
            <input type="text" {...register("address")} />
            {errors.address && <ErrorText>{errors.address.message}</ErrorText>}
          </HalfWidthField>

          <HalfWidthField>
            <Label>საფოსტო ინდექსი *</Label>
            <input type="text" {...register("zipCode")} />
            {errors.zipCode && <ErrorText>{errors.zipCode.message}</ErrorText>}
          </HalfWidthField>

          <HalfWidthField>
            <Label>რეგიონი</Label>
            <select {...register("region")}>
              <option value="">აირჩიეთ</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
            {errors.region && <ErrorText>{errors.region.message}</ErrorText>}
          </HalfWidthField>

          <HalfWidthField>
            <Label>ქალაქი</Label>
            <select {...register("city")}>
              <option value="">აირჩიეთ</option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
          </HalfWidthField>
        </InputGroup>

        <h4>ᲑᲘᲜᲘᲡ ᲓᲔᲢᲐᲚᲔᲑᲘ</h4>
        <InputGroup>
          <HalfWidthField>
            <Label>ფასი</Label>
            <input type="text" {...register("price")} />
            {errors.price && <ErrorText>{errors.price.message}</ErrorText>}
          </HalfWidthField>

          <HalfWidthField>
            <Label>ფართობი</Label>
            <input type="text" {...register("area")} />
            {errors.area && <ErrorText>{errors.area.message}</ErrorText>}
          </HalfWidthField>

          <HalfWidthField>
            <Label>საძინებლების რაოდენობა *</Label>
            <input type="text" {...register("bedrooms")} />
            {errors.bedrooms && (
              <ErrorText>{errors.bedrooms.message}</ErrorText>
            )}
          </HalfWidthField>

          <FormField>
            <Label>აღწერა *</Label>
            <textarea {...register("description")} style={{ height: "80px" }} />
            {errors.description && (
              <ErrorText>{errors.description.message}</ErrorText>
            )}
          </FormField>
        </InputGroup>

        <label>ატვირთეთ ფოტო *</label>
        <AvatarTextArea
          onClick={() => document.getElementById("avatar").click()}
        >
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

        <h4>ᲐᲒᲔᲜᲢᲘ</h4>
        <FormField>
          <select {...register("agent")}>
            <option value="">აირჩიეთ</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {`${agent.name} ${agent.surname}`}
              </option>
            ))}
          </select>
          {errors.agent && <ErrorText>{errors.agent.message}</ErrorText>}
        </FormField>

        <ButtonsContainer>
          <StyledButton
            $variant="secondary"
            style={{ width: "105px", height: "50px" }}
            onClick={handleFormReset}
            type="button"
          >
            გაუქმება
          </StyledButton>
          <StyledButton
            $variant="primary"
            style={{ width: "105px", height: "50px" }}
            type="submit"
          >
            დაამატე ლისტინგი
          </StyledButton>
        </ButtonsContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default AddListingForm;
