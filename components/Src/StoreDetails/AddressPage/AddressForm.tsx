// components/AddressForm.tsx

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryBtn from "@/appComponent/button/PrimaryButton";
import { ActivityIndicator } from "react-native-paper";
import { ApiClient } from "../../api/apiBaseUrl";

const AddressForm = ({
  expanded,
  setExpanded,
  title,
  image,
  showLocation,
  values,
  setValues,
  onSubmit,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [subAreaList, setSubAreaList] = useState([]);
  const [countryid, setCountryId] = useState("");
  const [StateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [subAreaId, setSubAreaId] = useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      const [countries, states, cities, areas, subAreaList] = await Promise.all(
        [
          ApiClient.post("/list_api_services?table_name=ViewCurrency"),
          ApiClient.post(
            `/list_api_services?table_name=ViewCity&filter_field_1=CountryID&filter_condition_1=eq&filter_value_1=${countryid}`
          ),
          ApiClient.post(
            `/list_api_services?table_name=ViewCity&filter_field_1=CountryID&filter_condition_1=eq&filter_value_1=${countryid}&filter_field_2=StateId&filter_condition_2=eq&filter_value_2=${StateId}`
          ),
          ApiClient.post(
            `/list_api_services?table_name=ViewArea&filter_field_1=CountryID&filter_condition_1=eq&filter_value_1=${countryid}&filter_field_2=StateId&filter_condition_2=eq&filter_value_2=${StateId}&filter_field_3=CityId&filter_condition_3=eq&filter_value_3=${cityId}`
          ),
          ApiClient.post(
            `/list_api_services?table_name=ViewSubArea&filter_field_1=CountryID&filter_condition_1=eq&filter_value_1=${countryid}&filter_field_2=StateId&filter_condition_2=eq&filter_value_2=${StateId}&filter_field_3=CityId&filter_condition_3=eq&filter_value_3=${cityId}&filter_field_4=AreaId&filter_condition_4=eq&filter_value_4=${areaId}`
          ),
        ]
      );

      if (countries?.data?.data) setCountryList(countries.data.data);
      if (states?.data?.data) setStateList(states.data.data);
      if (cities?.data?.data) setCityList(cities.data.data);
      if (areas?.data?.data) setAreaList(areas.data.data);
      if (subAreaList?.data?.data) setSubAreaList(subAreaList.data.data);
      setLoading(false);
    } catch (error) {
      console.error("API error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [countryid, StateId, cityId, areaId]);

  return (
    <View style={styles.addressContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.headerLeft}>
          <Image source={image} style={{ height: 20, width: 20 }} />
          <Text style={styles.headerText}>{title}</Text>
        </View>
        {expanded ? (
          <FontAwesomeIcon icon={faMinus} />
        ) : loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#81C784" />
          </View>
        ) : (
          <FontAwesomeIcon icon={faPlus} size={18} />
        )}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <Text style={styles.label}>Shop Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Restaurant Name"
            value={values.shopName}
            onChangeText={(text) =>
              setValues({ ...values, contactPerson: text })
            }
          />

          <Text style={styles.label}>Door No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Door No"
            keyboardType="numeric"
            value={values.doorNo}
            onChangeText={(text) => setValues({ ...values, doorNo: text })}
          />

          <Text style={styles.label}>Street Name / Landmark:</Text>
          <TextInput
            style={styles.input}
            placeholder="Street Name / Landmark"
            value={values.street}
            onChangeText={(text) => setValues({ ...values, addressName: text })}
          />

          <Text style={styles.label}>Country:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.country}
              onValueChange={(val) => {
                setValues({ ...values, countryName: String(val) });
                setCountryId(val);
              }}
              style={styles.pickerStyle}
              dropdownIconColor="#606060"
            >
              <Picker.Item
                label="Select Country"
                value=""
                enabled={false}
                color="#A0A0A0"
              />
              {countryList.map((item: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={item.Country}
                  value={item.UID}
                  color="#000"
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>State:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.state}
              onValueChange={(val) => {
                setValues({ ...values, stateName: String(val) });
                setStateId(val);
              }}
              style={styles.pickerStyle}
              dropdownIconColor="#606060"
            >
              <Picker.Item
                label="Select State"
                value=""
                enabled={false}
                color="#A0A0A0"
              />
              {stateList.map((item: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={item.StateName}
                  value={item.StateID}
                  color="#000"
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>City:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.city}
              onValueChange={(val) => {
                setValues({ ...values, cityName: String(val) });
                setCityId(val);
              }}
              style={styles.pickerStyle}
              dropdownIconColor="#606060"
            >
              <Picker.Item
                label="Select City"
                value=""
                enabled={false}
                color="#A0A0A0"
              />
              {cityList.map((item: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={item.City}
                  value={item.CityID}
                  color="#000"
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Area:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.area}
              onValueChange={(val) => {
                setValues({ ...values, subAreaId: 0 });
                setSubAreaId(val);
              }}
              style={styles.pickerStyle}
              dropdownIconColor="#606060"
            >
              <Picker.Item
                label="Select Area"
                value=""
                enabled={false}
                color="#A0A0A0"
              />
              {areaList.map((item: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={item.AreaName}
                  value={item.UID}
                  color="#000"
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Sub Area:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.subAreaList}
              onValueChange={(val) => {
                setValues({ ...values, subAreaId: 0 });
                setAreaId(val);
              }}
              style={styles.pickerStyle}
              dropdownIconColor="#606060"
            >
              <Picker.Item
                label="Select Sub Area"
                value=""
                enabled={false}
                color="#A0A0A0"
              />
              {subAreaList.map((item: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={item.SubArea}
                  value={item.ID}
                  color="#000"
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Postal Code:</Text>
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            keyboardType="numeric"
            value={values.postal}
            onChangeText={(text) =>
              setValues({ ...values, postalcode: Number(text) })
            }
          />

          {showLocation && (
            <View style={styles.locationcontainer}>
              <TouchableOpacity style={{ ...styles.button, marginTop: 25 }}>
                <Text style={styles.buttonText}>Locate Me</Text>
              </TouchableOpacity>

              <View style={styles.column}>
                <Text style={styles.locationlabel}>Latitude:</Text>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>9.000</Text>
                </View>
              </View>

              <View style={styles.column}>
                <Text style={styles.locationlabel}>Longitude:</Text>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>79.11</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.savebutton}>
            <PrimaryBtn action={onSubmit} btnTxt="Submit" loading={loading} />
          </View>
        </View>
      )}
    </View>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  addressContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: "hidden",
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    color: "#060606",
  },
  input: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#BEBEBE",
  },
  pickerContainer: {
    height: 50,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
  },
  pickerStyle: {
    color: "#333",
    fontSize: 14,
  },
  savebutton: {
    marginTop: 20,
  },
  locationcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  column: {
    alignItems: "center",
  },
  locationlabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#26B24B",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "35%",
    alignItems: "center",
    minWidth: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
