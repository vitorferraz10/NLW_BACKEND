import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit Feedback", () => {
  it("shout be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64/wwewe",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("shout not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;kjkjkjkj",
      })
    ).rejects.toThrow();
  });

  it("shout not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "asdasd",
        comment: "",
        screenshot: "data:image/png;kjkjkjkj",
      })
    ).rejects.toThrow();
  });
  it("shout not be able to submit an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "asdasd",
        comment: "dadsad",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
