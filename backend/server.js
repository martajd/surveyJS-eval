const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for surveys (for PoC)
const surveys = {
  '1': {
    id: '1',
    name: 'Customer Satisfaction Survey',
    schema: {
      "title": "Customer Feedback",
      "description": "Please help us improve our service",
      "pages": [
        {
          "name": "page1",
          "elements": [
            {
              "type": "radiogroup",
              "name": "satisfaction",
              "title": "How satisfied are you with our service?",
              "choices": [
                "Very Satisfied",
                "Satisfied",
                "Neutral",
                "Dissatisfied",
                "Very Dissatisfied"
              ],
              "isRequired": true
            },
            {
              "type": "checkbox",
              "name": "improvements",
              "title": "What areas need improvement? (Select all that apply)",
              "choices": [
                "Customer Service",
                "Product Quality",
                "Pricing",
                "Delivery Time",
                "Website Experience"
              ]
            },
            {
              "type": "comment",
              "name": "feedback",
              "title": "Additional Comments",
              "placeholder": "Please share your thoughts..."
            }
          ]
        }
      ]
    },
    createdAt: new Date('2025-12-15T10:00:00Z'),
    updatedAt: new Date('2025-12-15T10:00:00Z')
  }
};

// API Routes

// Get all surveys
app.get('/api/surveys', (req, res) => {
  res.json(Object.values(surveys));
});

// Get a specific survey
app.get('/api/surveys/:id', (req, res) => {
  const survey = surveys[req.params.id];
  if (!survey) {
    return res.status(404).json({ error: 'Survey not found' });
  }
  res.json(survey);
});

// Create a new survey
app.post('/api/surveys', (req, res) => {
  const id = Date.now().toString();
  const survey = {
    id,
    name: req.body.name || 'Untitled Survey',
    schema: req.body.schema || {},
    createdAt: new Date(),
    updatedAt: new Date()
  };
  surveys[id] = survey;
  res.status(201).json(survey);
});

// Update a survey
app.put('/api/surveys/:id', (req, res) => {
  const survey = surveys[req.params.id];
  if (!survey) {
    return res.status(404).json({ error: 'Survey not found' });
  }
  survey.name = req.body.name || survey.name;
  survey.schema = req.body.schema || survey.schema;
  survey.updatedAt = new Date();
  res.json(survey);
});

// Delete a survey
app.delete('/api/surveys/:id', (req, res) => {
  if (!surveys[req.params.id]) {
    return res.status(404).json({ error: 'Survey not found' });
  }
  delete surveys[req.params.id];
  res.json({ message: 'Survey deleted successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
