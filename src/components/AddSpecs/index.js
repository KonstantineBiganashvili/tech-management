import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { withOutBody } from '../../services/APIServices';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import './addSpecs.css';
import Header from '../Header';
import Select from '../Select';

const AddSpecs = () => {
  const [specsInfo, setSpecsInfo] = useState({
    image: [],
  });
  const [laptopBrands, setLaptopBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const brandsList = async () => {
      const brandsData = await withOutBody('GET', 'brands');

      setLaptopBrands(brandsData.data);
    };

    const cpusList = async () => {
      const cpusData = await withOutBody('GET', 'cpus');

      setCpus(cpusData.data);
    };

    brandsList();
    cpusList();
  }, []);

  const laptopsOptions = laptopBrands.map((laptop) => {
    return <Select key={laptop.id} id={laptop.id} selectName={laptop.name} />;
  });

  const cpuOptions = cpus.map((cpu) => {
    return <Select key={cpu.id} id={cpu.id} selectName={cpu.name} />;
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSpecsInfo((oldSpecsInfo) => ({
        ...oldSpecsInfo,
        image: acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      }));
    },
  });

  const handleCancel = () => {
    setSpecsInfo((oldInfo) => ({
      ...oldInfo,
      image: [],
    }));
  };

  const images = specsInfo.image.map((file) => (
    <img
      key={file.name}
      src={file.preview}
      style={{ width: '100%', height: '300px', objectFit: 'contain' }}
      alt="laptop"
    />
  ));

  return (
    <div id="addSpecsInfo">
      <Link to="/">
        <FaArrowLeft id="backButton" />
      </Link>
      <Header activeSpecs={true} />
      <div className="inputFields">
        {specsInfo.image.length > 0 ? (
          <div id="uploadedImg">
            {images}
            <GiCancel onClick={handleCancel} id="cancelIcon" />
          </div>
        ) : (
          <div id="uploadImgField" {...getRootProps()}>
            <p id="imgUploadTxt">ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
            <p id="uploadImgLabel">ატვირთე</p>
            <input
              id="uploadImgInput"
              name="uploadImgInput"
              {...getInputProps()}
            />
          </div>
        )}

        <div className="inputGroups">
          <div id="laptopNameField">
            <label htmlFor="laptopNameInput">ლეპტოპის სახელი</label>
            <input type="text" id="laptopNameInput" name="laptopNameInput" />
            {errors.nameError ? (
              <p className="errorText">{errors.nameError}</p>
            ) : (
              <p className="additionalInfo">
                შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და
                !@#$%^&*()_+=
              </p>
            )}
          </div>

          <select defaultValue="brand" id="selectBrands">
            <option value="brand" disabled hidden>
              ბრენდი
            </option>
            {laptopsOptions}
          </select>
        </div>
        <hr style={{ width: '100%' }} />
        <div className="inputGroups">
          <div id="cpuInfo">
            <select defaultValue="brand" id="selectCpus">
              <option value="brand" disabled hidden>
                CPU
              </option>
              {cpuOptions}
            </select>
            <div id="cpuCoresField">
              <label htmlFor="cpuCoresInput">CPU-ს ბირთვი</label>
              <input type="number" id="cpuCoresInput" name="cpuCoresInput" />
              {errors.nameError ? (
                <p className="errorText">{errors.nameError}</p>
              ) : (
                <p className="additionalInfo">მხოლოდ ციფრები</p>
              )}
            </div>
            <div id="cpuThreadsField">
              <label htmlFor="cpuThreadsInput">CPU-ს ნაკადი</label>
              <input
                type="number"
                id="cpuThreadsInput"
                name="cpuThreadsInput"
              />
              {errors.nameError ? (
                <p className="errorText">{errors.nameError}</p>
              ) : (
                <p className="additionalInfo">მხოლოდ ციფრები</p>
              )}
            </div>
          </div>
        </div>
        <div className="inputGroups">
          <div id="ramField">
            <label htmlFor="ramInput">ლეპტოპის RAM (GB)</label>
            <input type="number" id="ramInput" name="ramInput" />
            {errors.nameError ? (
              <p className="errorText">{errors.nameError}</p>
            ) : (
              <p className="additionalInfo">მხოლოდ ციფრები</p>
            )}
          </div>

          <div id="storageRadioBtns">
            <p>მეხსიერების ტიპი</p>
            <div className="radioBtnsGroup">
              <div className="radioBtn">
                <input type="radio" name="storageType" id="SSD" />
                <label htmlFor="SSD">SSD</label>
              </div>
              <div className="radioBtn">
                <input type="radio" name="storageType" id="HDD" />
                <label htmlFor="SSD">HDD</label>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <div className="inputGroups">
          <div id="dateField">
            <label htmlFor="dateInput">შეძენის რიცხვი (არჩევითი)</label>
            <input type="date" id="dateInput" name="dateInput" />
          </div>
          <div id="priceField">
            <label htmlFor="priceInput">ლეპტოპის ფასი</label>
            <input type="number" id="priceInput" name="priceInput" />
            {errors.nameError ? (
              <p className="errorText">{errors.nameError}</p>
            ) : (
              <p className="additionalInfo">მხოლოდ ციფრები</p>
            )}
          </div>
        </div>
        <div id="conditionRadioBtns">
          <p>ლეპტოპის მდგომარეობა</p>
          <div className="radioBtnsGroup">
            <div className="radioBtn">
              <input type="radio" name="condition" id="new" />
              <label htmlFor="new">ახალი</label>
            </div>
            <div className="radioBtn">
              <input type="radio" name="condition" id="old" />
              <label htmlFor="old">ნახმარი</label>
            </div>
          </div>
        </div>

        <div id="actionButtonsGroup">
          <button
            id="previousButton"
            onClick={() => {
              navigate('../addrecord/employee');
            }}
          >
            უკან
          </button>
          <button className="nextButton">დამახსოვრება</button>
        </div>
      </div>
      <img src="/img/logo-round.png" alt="redberry round logo" />
    </div>
  );
};

export default AddSpecs;
