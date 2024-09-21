import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";

const FormContainer = styled.form``;

const FormField = styled.div``;

const Label = styled.label``;

const ErrorText = styled.p`
  color: red;
`;
const AvatarTextArea = styled.div`
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const PlusIcon = styled.span`
  font-size: 50px;
  color: #ccc;
`;

const AvatarPreviewContainer = styled.div``;

const AvatarPreview = styled.img``;

const DeleteIcon = styled.button``;

const ButtonsContainer = styled.div`
  display: flex;
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
  const [buttonVariant, setButtonVariant] = useState("primary");

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

  const handleSubmitClick = () => {
    setButtonVariant("secondary");
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <h2>ლისტინგის დამატება</h2>

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      <FormField>
        <h5>გარიგების ტიპი</h5>
        <input type="radio" value="sale" {...register("saleRent")} /> იყიდება
        <input type="radio" value="rent" {...register("saleRent")} /> ქირავდება
        {errors.saleRent && <ErrorText>{errors.saleRent.message}</ErrorText>}
      </FormField>

      <div className="">
        <h5>მდებარეობა</h5>
        <FormField>
          <Label>მისამართი *</Label>
          <input type="text" {...register("address")} />
          {errors.address && <ErrorText>{errors.address.message}</ErrorText>}
        </FormField>

        <FormField>
          <Label>საფოსტო ინდექსი *</Label>
          <input type="text" {...register("zipCode")} />
          {errors.zipCode && <ErrorText>{errors.zipCode.message}</ErrorText>}
        </FormField>

        <FormField>
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
        </FormField>

        <FormField>
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
        </FormField>
      </div>

      <div className="">
        <h5>ბინის დეტალები</h5>

        <FormField>
          <Label>ფასი</Label>
          <input type="text" {...register("price")} />
          {errors.price && <ErrorText>{errors.price.message}</ErrorText>}
        </FormField>

        <FormField>
          <Label>ფართობი</Label>
          <input type="text" {...register("area")} />
          {errors.area && <ErrorText>{errors.area.message}</ErrorText>}
        </FormField>

        <FormField>
          <Label>საძინებლების რაოდენობა *</Label>
          <input type="text" {...register("bedrooms")} />
          {errors.bedrooms && <ErrorText>{errors.bedrooms.message}</ErrorText>}
        </FormField>

        <FormField>
          <Label>აღწერა *</Label>
          <textarea {...register("description")} />
          {errors.description && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </FormField>

        <FormField>
          <Label>ატვირთეთ ფოტო *</Label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            {...register("avatar")}
            onChange={handleAvatarChange}
          />
          <AvatarTextArea
            onClick={() => document.getElementById("avatar").click()}
          >
            {!avatarPreview && <PlusIcon>+</PlusIcon>}
            {avatarPreview && (
              <AvatarPreviewContainer>
                <AvatarPreview src={avatarPreview} />
                <DeleteIcon
                  $variant="secondary"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAvatar();
                  }}
                >
                  🗑️
                </DeleteIcon>
              </AvatarPreviewContainer>
            )}
          </AvatarTextArea>
          {errors.avatar && <ErrorText>{errors.avatar.message}</ErrorText>}
        </FormField>
      </div>

      <FormField>
        <h5>აგენტი</h5>
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
          $variant={"primary"}
          style={{ width: "105px", height: "45px" }}
          onClick={handleFormReset}
        >
          გაუქმება
        </StyledButton>
        <StyledButton
          $variant={buttonVariant}
          style={{ width: "105px", height: "45px" }}
          type="submit"
          onClick={handleSubmitClick}
        >
          დაამატე ლისტინგი
        </StyledButton>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default AddListingForm;
