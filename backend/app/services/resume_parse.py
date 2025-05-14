import spacy

class ResumeParser:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    def analyze_resume(self, text: str):
        doc = self.nlp(text)
        entities = [(ent.text, ent.label_) for ent in doc.ents]
        keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]
        return {
            "entities": entities,
            "keywords": keywords[:10],  # Limit to top 10 keywords
            "suggestions": self.generate_suggestions(keywords)
        }

    def generate_suggestions(self, keywords):
        # Mock suggestions (integrate GPT-based model in production)
        return ["Add more technical skills", "Include recent projects"]