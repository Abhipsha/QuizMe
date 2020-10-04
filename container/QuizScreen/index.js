import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
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
  const [selectedAns, setSelectedAns] = useState(undefined);
  const [count, setCount] = useState(null);
  const [secondCounter, setSecondCounter] = useState(null);
  const [showResult, setShowReult] = useState(false);

  useEffect(() => {
    if (count === 0) {
      if (questionCount !== 15) {
        setSelectedAns(undefined);
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
      if (questionCount !== 15) {
        setQuestionCount(questionCount + 1);
        setSelectedAns(undefined);
        setSecondCounter(60);
      } else {
        setShowReult(true);
      }
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

  const validateAnswer = (selectedAnswer, correctAnswer) => {
    if (questionCount !== 15) {
      setCount(5);
      setSecondCounter(null);
    }
    setSelectedAns(selectedAnswer);
    if (selectedAnswer === correctAnswer) {
      setCorrectAnsCount(correctAnsCount + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", marginTop: 50 }}>
      {!showResult ? (
        <ScrollView>
          <Text
            style={{ fontSize: 36, textAlign: "center", fontWeight: "600" }}
          >
            QUIZ ME
          </Text>
          <View style={{ marginHorizontal: 11, marginVertical: 7 }}>
            {map(questions, (item, index) => {
              return (
                <View>
                  {questionCount === item.number && (
                    <View key={index}>
                      <View style={{ flexDirection: "row", marginTop: 16 }}>
                        <Text style={{ fontSize: 17 }}>{item.number}. </Text>
                        <Text style={{ fontSize: 17, fontWeight: "400" }}>
                          {item.question}{" "}
                        </Text>
                      </View>
                      {secondCounter > 0 && (
                        <View style={{ marginTop: 21 }}>
                          <Text style={{ textAlign: "center" }}>
                            00:
                            {secondCounter < 10
                              ? "0" + secondCounter
                              : secondCounter}
                          </Text>
                        </View>
                      )}
                      <View style={{ marginTop: 55 }}>
                        {map(item.answers, (ans, index) => {
                          const checked = ans === selectedAns;
                          const correctAns =
                            selectedAns === item.correct_answer;

                          return (
                            <View
                              key={index}
                              style={{ marginVertical: 11, marginTop: 30 }}
                            >
                              <TouchableOpacity
                                disabled={selectedAns}
                                style={[
                                  Styles.optionsBtnStyle,
                                  {
                                    backgroundColor: checked
                                      ? correctAns
                                        ? "#66F4B0"
                                        : "#FF7676"
                                      : "#FFF",
                                  },
                                ]}
                                onPress={() => {
                                  validateAnswer(ans, item.correct_answer);
                                }}
                              >
                                <Text
                                  style={{ padding: 17, fontSize: 17 }}
                                  index={index}
                                >
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
              style={Styles.submitBtnStyle}
            >
              <Text
                style={{
                  padding: 11,
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: 21,
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          ) : (
            <View>
              {count > 0 && (
                <Text style={{ textAlign: "center" }}> 00:0{count} </Text>
              )}
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 32, fontWeight: "600", color: "#0ca86c" }}>
            Congratulations !!
          </Text>
          <Image
            source={Confirm}
            resizeMode={"contain"}
            style={{
              width: 80,
              height: 80,
              alignSelf: "center",
              marginVertical: 20,
            }}
          />
          <Text style={{ fontSize: 21 }}>
            {" "}
            {`Your have scored ${correctAnsCount} out of 15`}
          </Text>
        </View>
      )}
    </View>
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
  submitBtnStyle: {
    backgroundColor: "#4169E1",
    alignSelf: "center",
    borderRadius: 9,
    width: WIDTH * 0.4,
  },
});
