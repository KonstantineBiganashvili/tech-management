import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { withOutBody } from '../../services/APIServices';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import './addSpecs.css';
import { validLaptopName } from '../../helpers/validators';
import Header from '../Header';
import Select from '../Select';

const AddSpecs = () => {
  const [specsInfo, setSpecsInfo] = useState(
    JSON.parse(localStorage.getItem('laptopSpecs')) || {
      laptop_name: '',
      laptop_image: [],
      laptop_brand_id: '',
      laptop_cpu: '',
      laptop_cpu_cores: '',
      laptop_cpu_threads: '',
      laptop_ram: '',
      laptop_hard_drive_type: '',
      laptop_state: '',
      laptop_purchase_date: '',
      laptop_price: '',
    }
  );
  const [laptopBrands, setLaptopBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    localStorage.setItem('laptopSpecs', JSON.stringify(specsInfo));

    setErrors({});
  }, [specsInfo]);

  const laptopsOptions = laptopBrands.map((laptop) => {
    return (
      <Select key={laptop.id} value={laptop.id} selectName={laptop.name} />
    );
  });

  const cpuOptions = cpus.map((cpu) => {
    return <Select key={cpu.id} id={cpu.id} selectName={cpu.name} />;
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSpecsInfo((oldSpecsInfo) => ({
        ...oldSpecsInfo,
        laptop_image: acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      }));
    },
  });

  const handleCancel = () => {
    setSpecsInfo((oldInfo) => ({
      ...oldInfo,
      laptop_image: [],
    }));
  };

  const images = specsInfo.laptop_image.map((file) => (
    <img
      key={file.name}
      src={file.preview}
      style={{ width: '100%', height: '300px', objectFit: 'contain' }}
      alt="laptop"
    />
  ));

  const handleStateChange = (name, inputValue) => {
    setSpecsInfo((oldSpecsInfo) => ({
      ...oldSpecsInfo,
      [name]: inputValue,
    }));
  };

  const handleSubmit = () => {
    if (!specsInfo.laptop_name.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        laptopNameError: 'ლეპტოპის სახელი არ უნდა იყოს ცარიელი',
      }));
    }

    if (!validLaptopName(specsInfo.laptop_name))
      setErrors((oldErrors) => ({
        ...oldErrors,
        laptopNameError:
          'შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და !@#$%^&()_+=',
      }));

    if (!specsInfo.laptop_brand_id.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        brandError: 'აირჩიეთ ბრენდი',
      }));
    }

    if (!specsInfo.laptop_cpu.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        cpuError: 'აირჩიეთ CPU',
      }));
    }

    if (!specsInfo.laptop_cpu_cores.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        coresError: 'შეიყვანეთ ბირთვების რაოდენობა',
      }));
    }

    if (!specsInfo.laptop_cpu_threads.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        threadsError: 'შეიყვანეთ ნაკადების რაოდენობა',
      }));
    }

    if (!specsInfo.laptop_ram.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        ramError: 'შეიყვანეთ RAM-ის რაოდენობა',
      }));
    }

    if (!specsInfo.laptop_hard_drive_type.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        storageError: 'აირჩიეთ მეხსიერების ტიპი',
      }));
    }

    if (!specsInfo.laptop_price.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        priceError: 'შეივყანეთ ლეპტოპის ფასი',
      }));
    }

    if (!specsInfo.laptop_state.trim()) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        stateError: 'შეიყვანეთ RAM-ის რაოდენობა',
      }));
    }
  };

  return (
    <div id="addSpecsInfo">
      <Link to="/">
        <FaArrowLeft id="backButton" />
      </Link>
      <Header activeSpecs={true} />
      <div className="inputFields">
        {specsInfo.laptop_image.length > 0 ? (
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
            <input
              type="text"
              id="laptopNameInput"
              name="laptopNameInput"
              value={specsInfo.laptop_name}
              onInput={({ target }) =>
                handleStateChange('laptop_name', target.value)
              }
            />
            {errors.laptopNameError ? (
              <p className="errorText">{errors.laptopNameError}</p>
            ) : (
              <p className="additionalInfo">
                შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და
                !@#$%^&*()_+=
              </p>
            )}
          </div>
          <div className="specsSelects">
            <select
              value={specsInfo.laptop_brand_id || 'brand'}
              id="selectBrands"
              onChange={({ target }) =>
                handleStateChange('laptop_brand_id', target.value)
              }
            >
              <option value="brand" disabled hidden>
                ბრენდი
              </option>
              {laptopsOptions}
            </select>
            {errors.brandError && (
              <p className="errorText">{errors.brandError}</p>
            )}
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <div className="inputGroups">
          <div id="cpuInfo">
            <div className="specsSelects">
              <select
                value={specsInfo.laptop_cpu || 'CPU'}
                id="selectCpus"
                onChange={({ target }) =>
                  handleStateChange('laptop_cpu', target.value)
                }
              >
                <option value="CPU" disabled hidden>
                  CPU
                </option>
                {cpuOptions}
              </select>
              {errors.cpuError && (
                <p className="errorText">{errors.cpuError}</p>
              )}
            </div>
            <div id="cpuCoresField">
              <label htmlFor="cpuCoresInput">CPU-ს ბირთვი</label>
              <input
                type="number"
                id="cpuCoresInput"
                name="cpuCoresInput"
                value={specsInfo.laptop_cpu_cores}
                onInput={({ target }) =>
                  handleStateChange('laptop_cpu_cores', target.value)
                }
              />
              {errors.coresError ? (
                <p className="errorText">{errors.coresError}</p>
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
                value={specsInfo.laptop_cpu_threads}
                onInput={({ target }) =>
                  handleStateChange('laptop_cpu_threads', target.value)
                }
              />
              {errors.threadsError ? (
                <p className="errorText">{errors.threadsError}</p>
              ) : (
                <p className="additionalInfo">მხოლოდ ციფრები</p>
              )}
            </div>
          </div>
        </div>
        <div className="inputGroups">
          <div id="ramField">
            <label htmlFor="ramInput">ლეპტოპის RAM (GB)</label>
            <input
              type="number"
              id="ramInput"
              name="ramInput"
              value={specsInfo.laptop_ram}
              onInput={({ target }) =>
                handleStateChange('laptop_ram', target.value)
              }
            />
            {errors.ramError ? (
              <p className="errorText">{errors.ramError}</p>
            ) : (
              <p className="additionalInfo">მხოლოდ ციფრები</p>
            )}
          </div>

          <div id="storageRadioBtns">
            <p>მეხსიერების ტიპი</p>
            <div className="radioBtnsGroup">
              <div className="radioBtn">
                <input
                  type="radio"
                  name="storageType"
                  id="SSD"
                  value="SSD"
                  onChange={({ target }) =>
                    handleStateChange('laptop_hard_drive_type', target.value)
                  }
                />
                <label htmlFor="SSD">SSD</label>
              </div>
              <div className="radioBtn">
                <input
                  type="radio"
                  name="storageType"
                  id="HDD"
                  value="HDD"
                  onChange={({ target }) =>
                    handleStateChange('laptop_hard_drive_type', target.value)
                  }
                />
                <label htmlFor="SSD">HDD</label>
              </div>
            </div>
            {errors.storageError && (
              <p className="errorText">{errors.storageError}</p>
            )}
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <div className="inputGroups">
          <div id="dateField">
            <label htmlFor="dateInput">შეძენის რიცხვი (არჩევითი)</label>
            <input
              type="date"
              id="dateInput"
              name="dateInput"
              value={specsInfo.laptop_purchase_date}
              onInput={({ target }) =>
                handleStateChange('laptop_purchase_date', target.value)
              }
            />
          </div>
          <div id="priceField">
            <label htmlFor="priceInput">ლეპტოპის ფასი</label>
            <input
              type="number"
              id="priceInput"
              name="priceInput"
              value={specsInfo.laptop_price}
              onChange={({ target }) =>
                handleStateChange('laptop_price', target.value)
              }
            />
            {errors.priceError ? (
              <p className="errorText">{errors.priceError}</p>
            ) : (
              <p className="additionalInfo">მხოლოდ ციფრები</p>
            )}
          </div>
        </div>
        <div id="conditionRadioBtns">
          <p>ლეპტოპის მდგომარეობა</p>
          <div className="radioBtnsGroup">
            <div className="radioBtn">
              <input
                type="radio"
                name="condition"
                id="new"
                value="new"
                onChange={({ target }) =>
                  handleStateChange('laptop_state', target.value)
                }
              />
              <label htmlFor="new">ახალი</label>
            </div>
            <div className="radioBtn">
              <input
                type="radio"
                name="condition"
                id="old"
                value="old"
                onChange={({ target }) =>
                  handleStateChange('laptop_state', target.value)
                }
              />
              <label htmlFor="old">ნახმარი</label>
            </div>
          </div>
          {errors.stateError && (
            <p className="errorText">{errors.stateError}</p>
          )}
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
          <button className="nextButton" onClick={handleSubmit}>
            დამახსოვრება
          </button>
        </div>
      </div>
      <img src="/img/logo-round.png" alt="redberry round logo" />
    </div>
  );
};

export default AddSpecs;
