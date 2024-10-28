import React, { useState } from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const MindsetAssessment = () => {
  // 定义问题数据
  const questions = {
    growthMindset: [
      {
        id: 'gm1',
        text: '当遇到挫折时，我倾向于将其视为学习的机会',
        positive: true,
      },
      {
        id: 'gm2',
        text: '当有人指出我的不足时，我会感到不安',
        positive: false,
      },
      { id: 'gm3', text: '我相信每个人都有持续进步的潜力', positive: true },
      {
        id: 'gm4',
        text: '如果一件事我天生就不擅长，那最好避免去做',
        positive: false,
      },
      {
        id: 'gm5',
        text: '我认为天赋决定了一个人能达到的高度',
        positive: false,
      },
      {
        id: 'gm6',
        text: '即使很有天赋的人，不努力也难有大的成就',
        positive: true,
      },
      {
        id: 'gm7',
        text: '面对新的挑战，我相信通过努力能够掌握所需的能力',
        positive: true,
      },
      {
        id: 'gm8',
        text: '看到别人轻松做好某事时，我会怀疑自己的能力',
        positive: false,
      },
      { id: 'gm9', text: '犯错让我明白还有哪些需要学习', positive: true },
    ],
    copingStyle: [
      { id: 'cs1', text: '面对困难时，我通常能保持冷静思考', positive: true },
      { id: 'cs2', text: '当问题变得复杂时，我容易感到焦虑', positive: false },
      { id: 'cs3', text: '我倾向于把问题分解成小步骤来解决', positive: true },
      { id: 'cs4', text: '遇到障碍时，我常常不知道从何下手', positive: false },
      { id: 'cs5', text: '遇到问题时，我会主动寻求解决方案', positive: true },
      { id: 'cs6', text: '我倾向于回避令我不舒服的情况', positive: false },
      { id: 'cs7', text: '我能够从多个角度思考问题', positive: true },
      {
        id: 'cs8',
        text: '遇到挫折后，我需要较长时间才能调整心态',
        positive: false,
      },
    ],
    selfAwareness: [
      { id: 'sa1', text: '我能清楚地认识自己的优势和局限', positive: true },
      { id: 'sa2', text: '我经常怀疑自己的决定是否正确', positive: false },
      { id: 'sa3', text: '我知道什么对我来说是最重要的', positive: true },
      { id: 'sa4', text: '我总觉得自己比不上其他人', positive: false },
      { id: 'sa5', text: '我能根据实际情况调整自己的期望', positive: true },
      { id: 'sa6', text: '我很在意别人对我的评价', positive: false },
      { id: 'sa7', text: '我能客观评估自己的表现', positive: true },
      { id: 'sa8', text: '即使犯错，我也不会过分苛责自己', positive: true },
    ],
    openness: [
      { id: 'o1', text: '我愿意尝试新的方法和思路', positive: true },
      { id: 'o2', text: '改变既定计划让我感到不安', positive: false },
      { id: 'o3', text: '我对未知的事物感到好奇', positive: true },
      { id: 'o4', text: '我更倾向于使用已经熟悉的方式', positive: false },
      { id: 'o5', text: '我能灵活调整计划来适应新情况', positive: true },
      { id: 'o6', text: '面对变化，我更多看到风险而非机会', positive: false },
      { id: 'o7', text: '我喜欢听取不同的观点和建议', positive: true },
      { id: 'o8', text: '我觉得按照惯例做事更有保障', positive: false },
    ],
  }

  // 存储答案的状态
  const [answers, setAnswers] = useState({})

  // 添加显示结果的状态
  const [showResults, setShowResults] = useState(false)

  // 处理答案变化
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: parseInt(value),
    }))
  }

  // 计算得分
  const calculateScores = () => {
    const scores = {
      growthMindset: 0,
      copingStyle: 0,
      selfAwareness: 0,
      openness: 0,
    }

    Object.entries(questions).forEach(([dimension, questionList]) => {
      questionList.forEach((question) => {
        const answer = answers[question.id] || 0
        scores[dimension] += question.positive ? answer : 6 - answer
      })
    })

    return scores
  }

  // 生成图表数据
  const getChartData = (scores) => {
    return [
      {
        dimension: '成长信念',
        score: scores.growthMindset,
        fullMark: 45,
      },
      {
        dimension: '应对模式',
        score: scores.copingStyle,
        fullMark: 40,
      },
      {
        dimension: '自我认知',
        score: scores.selfAwareness,
        fullMark: 40,
      },
      {
        dimension: '开放性',
        score: scores.openness,
        fullMark: 40,
      },
    ]
  }

  // 计算总题目数
  const totalQuestions = Object.values(questions).reduce(
    (acc, curr) => acc + curr.length,
    0
  )

  // 计算完成度
  const completionRate = (Object.keys(answers).length / totalQuestions) * 100

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6 shadow-lg rounded-lg bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-2">思维模式评估</h2>
          <p className="text-sm text-gray-600">
            1=非常不符合, 2=比较不符合, 3=一般, 4=比较符合, 5=非常符合
          </p>
        </div>
        <div className="p-6">
          {!showResults ? (
            <>
              <div className="mb-4 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              {Object.entries(questions).map(
                ([dimension, questionList], index) => (
                  <div key={dimension} className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      {dimension === 'growthMindset' && '成长信念'}
                      {dimension === 'copingStyle' && '应对模式'}
                      {dimension === 'selfAwareness' && '自我认知'}
                      {dimension === 'openness' && '开放性'}
                    </h3>
                    {questionList.map((question, qIndex) => (
                      <div key={question.id} className="mb-4">
                        <p className="mb-2">
                          {qIndex + 1}. {question.text}
                        </p>
                        <div className="flex gap-4">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <label key={value} className="flex items-center">
                              <input
                                type="radio"
                                name={question.id}
                                value={value}
                                checked={answers[question.id] === value}
                                onChange={(e) =>
                                  handleAnswerChange(
                                    question.id,
                                    e.target.value
                                  )
                                }
                                className="mr-1"
                              />
                              {value}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
              <button
                onClick={() => setShowResults(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                查看结果
              </button>
            </>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">评估结果</h3>
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>成长信念：{calculateScores().growthMindset}/45</div>
                  <div>应对模式：{calculateScores().copingStyle}/40</div>
                  <div>自我认知：{calculateScores().selfAwareness}/40</div>
                  <div>开放性：{calculateScores().openness}/40</div>
                </div>
              </div>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={getChartData(calculateScores())}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" />
                    <Radar
                      name="得分"
                      dataKey="score"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip formatter={(value) => `${value}分`} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 space-y-6">
                <h4 className="text-lg font-semibold">维度解释</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h5 className="font-medium mb-2">
                      成长信念 ({calculateScores().growthMindset}/45)
                    </h5>
                    <p className="text-gray-700">
                      {calculateScores().growthMindset >= 36
                        ? '您展现出强烈的成长型思维倾向，相信通过努力能够提升能力和实现突破。'
                        : calculateScores().growthMindset >= 27
                        ? '您具有一定的成长型思维特征，但在某些领域可能还存在固定型思维。'
                        : '您在一些方面可能倾向于固定型思维，建议探索更多发展的可能性。'}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded">
                    <h5 className="font-medium mb-2">
                      应对模式 ({calculateScores().copingStyle}/40)
                    </h5>
                    <p className="text-gray-700">
                      {calculateScores().copingStyle >= 32
                        ? '您展现出积极有效的问题解决方式，能够冷静思考并采取行动。'
                        : calculateScores().copingStyle >= 24
                        ? '您的应对方式较为灵活，但在某些情况下可能需要更多策略支持。'
                        : '您可以尝试发展更多元的问题解决策略，提升应对效能。'}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded">
                    <h5 className="font-medium mb-2">
                      自我认知 ({calculateScores().selfAwareness}/40)
                    </h5>
                    <p className="text-gray-700">
                      {calculateScores().selfAwareness >= 32
                        ? '您对自己有清晰的认识，能够客观评估自己的优势和发展空间。'
                        : calculateScores().selfAwareness >= 24
                        ? '您具备基本的自我认知能力，可以进一步提升自我觉察。'
                        : '您可以投入更多关注在自我探索和认知上，建立更清晰的自我认识。'}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded">
                    <h5 className="font-medium mb-2">
                      开放性 ({calculateScores().openness}/40)
                    </h5>
                    <p className="text-gray-700">
                      {calculateScores().openness >= 32
                        ? '您展现出高度的开放性，愿意尝试新事物并接纳不同观点。'
                        : calculateScores().openness >= 24
                        ? '您在开放性方面表现中等，在某些情况下会尝试新的可能。'
                        : '您可能更倾向于保持在熟悉的范围内，可以尝试逐步探索新的可能性。'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowResults(false)}
                className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                返回问卷
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MindsetAssessment
