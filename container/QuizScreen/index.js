import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { questions } from "../../questionaire.json";
import { find, findIndex, map } from "lodash";
import Confirm from "../../assets/confirm.png";
const WIDTH = Dimensions.get("window").width;
export const QuizScreen = () => {
  const [questionCount, setQuestionCount] = useState(1);
  const [correctAnsCount, setCorrectAnsCount] = useState(0);
  const [selectedAns, setSelectedAns] = useState([]);
  const [count, setCount] = useState(null);
  const [secondCounter, setSecondCounter] = useState(null);
  const [showResult, setShowReult] = useState(false);
  const validateAnswer = (selectedAnswer, correctAnswer) => {
    if (questionCount !== 15) {
      setCount(5);
      setSecondCounter(null);
    }
    setSelectedAns([selectedAnswer]);
    if (selectedAnswer === correctAnswer) {
      setCorrectAnsCount(correctAnsCount + 1);
    }
  };

  useEffect(() => {
    if (count === 0) {
      if (questionCount !== 15) {
        setQuestionCount(questionCount + 1);
      }
      setCount(null);
      setSecondCounter(60);
    }
    if (!count) return;
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  useEffect(() => {
    if (secondCounter === 0) {
      setQuestionCount(questionCount + 1);
      setSecondCounter(60);
    }
    if (!secondCounter) return;
    const intervalId = setInterval(() => {
      setSecondCounter(secondCounter - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [secondCounter]);

  useEffect(() => {
    setSecondCounter(60);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", marginHorizontal: 11 }}>
      {!showResult ? (
        <ScrollView>
          <Text style={{ fontSize: 36, textAlign: "center", fontWeight: "600" }}>QUIZ ME</Text>
          <View style={{ marginHorizontal: 11, marginVertical: 7 }}>
            {map(questions, (item, index) => {
              return (
                <View>
                  {questionCount === item.number && (
                    <View key={index}>
                      <View style={{ flexDirection: "row", marginTop: 16 }}>
                        <Text style={{ fontSize: 17 }}>{item.number}. </Text>
                        <Text style={{ fontSize: 17, fontWeight: "400" }}>{item.question} </Text>
                      </View>
                      {secondCounter > 0 && (
                        <View style={{ marginTop: 21 }}>
                          <Text style={{ textAlign: "center" }}>
                            {secondCounter < 10 ? "0" + secondCounter : secondCounter}:00
                          </Text>
                        </View>
                      )}
                      <View style={{ marginTop: 55 }}>
                        {map(item.answers, (ans, index) => {
                          const checked = findIndex(selectedAns, (ag) => ag === ans) !== -1;
                          const correctAns = find(selectedAns, (myAns) => myAns === item.correct_answer);
                          return (
                            <View key={index} style={{ marginVertical: 11, marginTop: 30 }}>
                              <TouchableOpacity
                                disabled={selectedAns.length > 1}
                                style={
                                  checked
                                    ? correctAns
                                      ? Styles.optionsBtnSuccessStyle
                                      : Styles.optionsBtnFailedStyle
                                    : Styles.optionsBtnStyle
                                }
                                onPress={() => {
                                  validateAnswer(ans, item.correct_answer);
                                }}
                              >
                                <Text style={{ padding: 17, fontSize: 17 }} index={index}>
                                  {ans}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          {questionCount === 15 && selectedAns.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                setShowReult(true);
              }}
              style={{ backgroundColor: "#4169E1", alignSelf: "center", borderRadius: 9, width: WIDTH * 0.4 }}
            >
              <Text style={{ padding: 11, textAlign: "center", color: "#FFFFFF", fontSize: 21 }}>SUBMIT</Text>
            </TouchableOpacity>
          ) : (
            <View>{count > 0 && <Text style={{ textAlign: "center" }}> 00:0{count} </Text>}</View>
          )}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 32, fontWeight: "600", color: "#0ca86c" }}>Congratulations !!</Text>
          <Image
            source={Confirm}
            resizeMode={"contain"}
            style={{ width: 80, height: 80, alignSelf: "center", marginVertical: 20 }}
          />
          <Text style={{ fontSize: 21 }}> {`Your have scored ${correctAnsCount} out of 15`}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  optionsBtnStyle: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 7,
    shadowColor: "#A0A0A0",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  optionsBtnFailedStyle: {
    backgroundColor: "#FF7676",
    borderRadius: 8,
    marginHorizontal: 7,
    shadowColor: "#A0A0A0",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  optionsBtnSuccessStyle: {
    backgroundColor: "#66F4B0",
    borderRadius: 8,
    marginHorizontal: 7,
    shadowColor: "#A0A0A0",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
});
